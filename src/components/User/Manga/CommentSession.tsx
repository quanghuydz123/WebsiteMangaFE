import { useEffect, useState, useCallback } from "react";
import { ENDPOINTS } from "../../../constrants/webInfo";
import apiHandler from "../../../apis/apiHandler";
import { Comment } from "../../../constrants/type";
import defaultAvatar from "../../../assets/images/account.png";

interface CommentSectionProps {
    mangaId: string | undefined;
}

const CommentSection = ({ mangaId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddComment, setShowAddComment] = useState(false);
    const [newComment, setNewComment] = useState("");

    const fetchComments = useCallback(async () => {
      if (!hasMore || loading) return;
      try {
        setLoading(true);
        const result = await apiHandler.execute(
          ENDPOINTS.COMMENT_ENDPOINT,
          `get-comment-section-for-manga?id=${mangaId}&page=${page}&limit=10`,
          null,
          "get"
        );
        if (result.data.comments.length === 0) {
          setHasMore(false);
        } else {
          setComments((prevComments) => [...prevComments, ...result.data.comments]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (err) {
        setError("Failed to load comments.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, [mangaId, page, hasMore, loading]);

    useEffect(() => {
      setComments([]);
      setPage(1);
      setHasMore(true);
      setError(null);
    }, [mangaId]);

    useEffect(() => {
      fetchComments();
    }, [fetchComments]);

    const handleScroll = useCallback(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        fetchComments();
      }
    }, [fetchComments]);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleAddComment = async () => {
      if (!newComment.trim()) return;
      try {
        await apiHandler.execute(
          ENDPOINTS.COMMENT_ENDPOINT,
          `add-comment`,
          { mangaId, text: newComment },
          "post"
        );
        setComments([{ _idComment: String(Date.now()), userName: "You", text: newComment }, ...comments]);
        setNewComment("");
        setShowAddComment(false);
      } catch (err) {
        setError("Failed to add comment.");
        console.log(err);
      }
    };

    return (
        <div className="mt-8 w-full bg-gray-800 p-6 rounded-md shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-2">Bình luận</h3>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._idComment} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-md">
              <img src={defaultAvatar} alt="Avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-white font-semibold">{comment.userName}</p>
                <p className="text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-gray-300 mt-4">Đang tải thêm bình luận...</p>}
        {!hasMore && <p className="text-gray-300 mt-4">Không còn bình luận nào.</p>}
        {/* Add Comment Section */}
        {showAddComment ? (
            <div className="mt-6">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                placeholder="Viết bình luận của bạn..."
            />
            <button
                onClick={handleAddComment}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
            >
                Gửi bình luận
            </button>
            <button
                onClick={() => setShowAddComment(false)}
                className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
                Hủy
            </button>
            </div>
        ) : (
            <button
            onClick={() => setShowAddComment(true)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
            >
            Thêm bình luận
            </button>
        )}
      </div>
    );
};

export default CommentSection;
