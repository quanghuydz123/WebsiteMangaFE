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
    const [commentSendingLoad, setCommentSendingLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddComment, setShowAddComment] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState("");
    const userId = localStorage.getItem("userId");

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

      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in.");
        return;
      }

      try {
        const result = await apiHandler.execute(
          ENDPOINTS.COMMENT_ENDPOINT,
          `create`,
          { manga: mangaId, user: userId, text: newComment, isReturnNewData: true },
          "post"
        );
       // Thêm bình luận mới vào đầu danh sách
      const newAddedComment = result.data; // Giả sử API trả về bình luận mới
      setComments((prevComments) => [{ ...newAddedComment, _idUser: newAddedComment.user}, ...prevComments]);

      setNewComment("");
      setShowAddComment(false);
      } catch (err) {
        setError("Failed to add comment.");
        console.log(err);
      } finally {
        setCommentSendingLoad(false);
      }
    };

    const handleDeleteComment = async (id: string) => {
      try {
        await apiHandler.execute(
          ENDPOINTS.COMMENT_ENDPOINT,
          `delete-commentById`,
          { idComment: id },
          "delete"
        );
        setComments(comments.filter(comment => comment._id !== id));
      } catch (err) {
        setError("Failed to delete comment.");
        console.log(err);
      }
    };

    const handleUpdateComment = async () => {
      if (!editCommentText.trim() || !editCommentId) return;
      try {
        await apiHandler.execute(
          ENDPOINTS.COMMENT_ENDPOINT,
          `update?id=${editCommentId}`,
          { text: editCommentText },
          "put"
        );
        setComments(comments.map(comment =>
          comment._id === editCommentId ? { ...comment, text: editCommentText } : comment
        ));
        setEditCommentId(null);
        setEditCommentText("");
      } catch (err) {
        setError("Failed to update comment.");
        console.log(err);
      }
    };

    return (
        <div className="mt-8 w-full bg-gray-800 p-6 rounded-md shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-2">Bình luận</h3>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-md">
              <img src={defaultAvatar} alt="Avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-white font-semibold">{comment.userName}</p>
                {editCommentId === comment._id ? (
                  <div>
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded-md"
                    />
                    <button onClick={handleUpdateComment} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2">
                      Cập nhật
                    </button>
                    <button onClick={() => setEditCommentId(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2 ml-2">
                      Hủy
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-300">{comment.text}</p>
                )}
                {comment._idUser == userId && (
                  <>
                    <button 
                      onClick={() => handleDeleteComment(comment._id)} 
                      className="text-red-500 mt-2 border border-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
                    >
                      Xóa
                    </button>

                    <button
                      onClick={() => {
                        setEditCommentId(comment._id);
                        setEditCommentText(comment.text);
                      }}
                      className="text-blue-500 mt-2 ml-4 border border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                      Chỉnh sửa
                    </button>
                  </>
                )}
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
                {editingCommentId ? "Cập nhật bình luận" : "Gửi bình luận"}
            </button>
            <button
                onClick={() => { setShowAddComment(false); setEditingCommentId(null); }}
                className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
                Hủy
            </button>
            </div>
        ) : (
            <button
            onClick={() => setShowAddComment(true)}
            className="flex mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
            >
            {commentSendingLoad && (
              <svg className="text-gray-300 animate-spin mr-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24">
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.75011 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.20749 20.9022C6.66488 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80101 17.3837 6.66488 20.9022 5.20749C24.4206 3.75011 28.1917 3 32 3Z"
                  fill="currentColor" />
                <path
                  d="M51 32H13M51 32L39.7071 39.7071M51 32L39.7071 24.2929"
                  stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            )}
            Viết bình luận
            </button>
        )}
        </div>
    );
};

export default CommentSection;
