'use client';

import { useEffect, useMemo, useState } from 'react';

type PostType = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  content: string;
  type: PostType;
  likeCount: number;
  createdAt: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export default function Home() {
  const [postTypes, setPostTypes] = useState<PostType[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = content.trim().length > 0 && selectedTypeId !== null && !loading;

  useEffect(() => {
    const load = async () => {
      const [typesRes, postsRes] = await Promise.all([
        fetch(`${apiBase}/post-types`),
        fetch(`${apiBase}/posts`),
      ]);

      const types = (await typesRes.json()) as PostType[];
      const posts = (await postsRes.json()) as Post[];
      setPostTypes(types);
      setPosts(posts);
      if (types.length > 0 && selectedTypeId === null) {
        setSelectedTypeId(types[0].id);
      }
    };

    void load();
  }, []);

  const selectedType = useMemo(
    () => postTypes.find((type) => type.id === selectedTypeId),
    [postTypes, selectedTypeId],
  );

  const submitPost = async () => {
    if (!canSubmit || selectedTypeId === null) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, typeId: selectedTypeId }),
      });
      const created = (await res.json()) as Post;
      setPosts((prev) => [created, ...prev]);
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId: number) => {
    const res = await fetch(`${apiBase}/posts/${postId}/likes`, { method: 'POST' });
    const data = (await res.json()) as { postId: number; likeCount: number };
    setPosts((prev) =>
      prev.map((post) =>
        post.id === data.postId ? { ...post, likeCount: data.likeCount } : post,
      ),
    );
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Bulletin Board</p>
          <h1>タグで分類するミニ掲示板</h1>
          <p className="sub">
            投稿の種類を選んで、シンプルに共有。気になる投稿にはいいねで反応。
          </p>
        </div>
      </header>

      <main className="main">
        <section className="card">
          <div className="card-header">
            <h2>新規投稿</h2>
            <span className="chip">{selectedType?.name ?? '未選択'}</span>
          </div>

          <div className="chip-group">
            {postTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`chip ${selectedTypeId === type.id ? 'active' : ''}`}
                onClick={() => setSelectedTypeId(type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>

          <textarea
            className="textarea"
            placeholder="いま考えていることを書いてください"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={4}
          />

          <div className="actions">
            <button className="primary" type="button" onClick={submitPost} disabled={!canSubmit}>
              {loading ? '投稿中...' : '投稿する'}
            </button>
            <span className="hint">{content.length}/200</span>
          </div>
        </section>

        <section className="timeline">
          <div className="timeline-header">
            <h2>最新の投稿</h2>
            <span className="count">{posts.length}件</span>
          </div>

          <div className="post-list">
            {posts.map((post) => (
              <article key={post.id} className="post">
                <div className="post-top">
                  <span className="tag">{post.type.name}</span>
                  <time>{new Date(post.createdAt).toLocaleString('ja-JP')}</time>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-actions">
                  <button type="button" className="like" onClick={() => likePost(post.id)}>
                    いいね
                  </button>
                  <span className="like-count">{post.likeCount}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
