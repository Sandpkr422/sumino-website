import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const postsFilePath = path.join(dataDir, "social_posts.json");
const researchFilePath = path.join(dataDir, "social_research.json");

// Helper to read posts
async function readPosts() {
  try {
    const fileContents = await fs.readFile(postsFilePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (err) {
    return [];
  }
}

// Helper to write posts
async function writePosts(posts: any[]) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter"); // research, posts, or all
    
    if (filter === "research") {
      // Return research logs
      try {
        const fileContents = await fs.readFile(researchFilePath, "utf-8");
        return NextResponse.json({ success: true, research: JSON.parse(fileContents) });
      } catch (err) {
        return NextResponse.json({ success: true, research: [] });
      }
    }

    const posts = await readPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error("GET posts error:", error);
    return NextResponse.json({ message: "Failed to fetch social posts.", error: error?.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, scheduledDate, twitterThread, linkedinPost, videoScript, imagePrompt } = body;

    if (!id) {
      return NextResponse.json({ message: "Post ID is required for update." }, { status: 400 });
    }

    const posts = await readPosts();
    const postIndex = posts.findIndex((p: any) => p.id === id);

    if (postIndex === -1) {
      return NextResponse.json({ message: `Post with ID ${id} not found.` }, { status: 404 });
    }

    // Update fields if provided
    const updatedPost = { ...posts[postIndex] };

    if (status !== undefined) updatedPost.status = status;
    if (scheduledDate !== undefined) updatedPost.scheduledDate = scheduledDate;
    if (twitterThread !== undefined) updatedPost.twitterThread = twitterThread;
    if (linkedinPost !== undefined) updatedPost.linkedinPost = linkedinPost;
    if (videoScript !== undefined) updatedPost.videoScript = videoScript;
    if (imagePrompt !== undefined) updatedPost.imagePrompt = imagePrompt;

    posts[postIndex] = updatedPost;
    await writePosts(posts);

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("PUT posts error:", error);
    return NextResponse.json({ message: "Failed to update social post.", error: error?.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Post ID is required for deletion." }, { status: 400 });
    }

    const posts = await readPosts();
    const filteredPosts = posts.filter((p: any) => p.id !== id);

    if (posts.length === filteredPosts.length) {
      return NextResponse.json({ message: `Post with ID ${id} not found.` }, { status: 404 });
    }

    await writePosts(filteredPosts);
    return NextResponse.json({ success: true, message: "Post deleted successfully." });
  } catch (error: any) {
    console.error("DELETE posts error:", error);
    return NextResponse.json({ message: "Failed to delete social post.", error: error?.message }, { status: 500 });
  }
}
