import JSZip from "jszip";
import { NextResponse } from "next/server";
import * as path from "node:path";
import * as fs from "node:fs/promises";

export const runtime = "nodejs";

async function collectFilesRecursively(baseDir: string): Promise<Array<{ absPath: string; relPath: string }>> {
	const results: Array<{ absPath: string; relPath: string }> = [];

	async function walk(currentDir: string) {
		const dirents = await fs.readdir(currentDir, { withFileTypes: true });
		for (const dirent of dirents) {
			// skip hidden files/folders
			if (dirent.name.startsWith(".")) continue;
			const absChild = path.join(currentDir, dirent.name);
			const relChild = path.relative(baseDir, absChild).split(path.sep).join("/");
			if (dirent.isDirectory()) {
				await walk(absChild);
			} else if (dirent.isFile()) {
				results.push({ absPath: absChild, relPath: relChild });
			}
		}
	}

	await walk(baseDir);
	return results;
}

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		if (!id) {
			return NextResponse.json({ error: "Missing portfolio id" }, { status: 400 });
		}

		const portfolioDir = path.join(process.cwd(), "public", "portfolio-code", id);
		const stat = await fs.stat(portfolioDir).catch(() => null);
		if (!stat || !stat.isDirectory()) {
			return NextResponse.json({ error: "Code archive not found" }, { status: 404 });
		}

		const files = await collectFilesRecursively(portfolioDir);
		if (files.length === 0) {
			return NextResponse.json({ error: "No files available for download" }, { status: 404 });
		}

		const zip = new JSZip();
		for (const file of files) {
			const data = await fs.readFile(file.absPath);
			zip.file(file.relPath, data);
		}

		const zipBuffer = await zip.generateAsync({
			type: "nodebuffer",
			compression: "DEFLATE",
			compressionOptions: { level: 6 },
		});

		return new NextResponse(zipBuffer, {
			headers: {
				"Content-Type": "application/zip",
				"Content-Disposition": `attachment; filename=portfolio-${id}.zip`,
				"Cache-Control": "public, max-age=0, must-revalidate",
			},
		});
	} catch (err) {
		console.error("ZIP download error", err);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}


