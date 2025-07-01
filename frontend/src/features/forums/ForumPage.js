import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { fetchForumComments, postForumComment, postForumReply, upvoteForum, removeUpvoteForum, fetchForumById } from '../../api/forum';
import Comment from './Comment';
import { handleAuthError } from '../../shared/utils/handleAuthError';
import NotFound from '../errors/NotFound';

function ForumPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [replyForms, setReplyForms] = useState(null); // Only one open at a time
  const [replyInputs, setReplyInputs] = useState({});
  const [postingComment, setPostingComment] = useState(false);
  const [postingReply, setPostingReply] = useState(false);
  const [commentUpvotes, setCommentUpvotes] = useState({});
  const [commentUpvoted, setCommentUpvoted] = useState({});
  const [forumUpvotes, setForumUpvotes] = useState(0);
  const [forumUpvoted, setForumUpvoted] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchForumById(id)
      .then(data => {
        setForum(data);
        setForumUpvotes(data.upvote_count); // Replace with actual upvote count from API
        setForumUpvoted(data.is_upvoted); // Replace with actual upvoted state from API
      })
      .catch(err => {
        if (err.message === 'User is not authenticated') {
          handleAuthError(navigate);
        } else {
          setError('Forum not found or failed to load.');
        }
      });

    fetchForumComments(id)
      .then(data => {
        const tree = buildCommentTree(data);
        setComments(tree);
        // Optionally set upvotes and upvoted state for each comment
        const upvotes = {};
        const upvoted = {};
        data.forEach(comment => {
          upvotes[comment.id] = comment.upvote_count || 0;
          upvoted[comment.id] = false;
        });
        setCommentUpvotes(upvotes);
        setCommentUpvoted(upvoted);
      })
      .catch(() => {
        setComments([]);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const refreshComments = () => {
    fetchForumComments(id)
      .then(data => {
        const tree = buildCommentTree(data);
        console.log('Comment tree:', tree);
        setComments(tree);
        const upvotes = {};
        const upvoted = {};
        data.forEach(comment => {
          upvotes[comment.id] = comment.upvote_count || 0;
          upvoted[comment.id] = false;
        });
        setCommentUpvotes(upvotes);
        setCommentUpvoted(upvoted);
      })
      .catch(() => setComments([]));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setPostingComment(true);
    try {
      await postForumComment(id, newComment.trim());
      setNewComment('');
      refreshComments();
    } catch (err) {
      alert(err.message);
    } finally {
      setPostingComment(false);
    }
  };

  const handleReplyToggle = (commentId) => {
    setReplyForms(prev => (prev === commentId ? null : commentId));
    setReplyInputs({}); // Optionally clear all reply inputs
  };

  const handleReplyInputChange = (commentId, value) => {
    setReplyInputs(prev => ({ ...prev, [commentId]: value }));
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const replyContent = replyInputs[commentId];
    if (!replyContent || !replyContent.trim()) return;
    setPostingReply(true);
    try {
      await postForumReply(id, commentId, replyContent.trim());
      setReplyInputs({ ...replyInputs, [commentId]: '' });
      setReplyForms(null);
      refreshComments();
    } catch (err) {
      alert(err.message);
    } finally {
      setPostingReply(false);
    }
  };

  const handleCommentUpvote = (commentId) => {
    setCommentUpvotes(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + (commentUpvoted[commentId] ? -1 : 1)
    }));
    setCommentUpvoted(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
    // TODO: API call to update upvote
  };

  const handleForumUpvote = async () => {
    if (forumUpvoted) {
      setForumUpvotes(prev => prev - 1);
      setForumUpvoted(false);
      try {
        await removeUpvoteForum(id);
      } catch (err) {
        setForumUpvotes(prev => prev + 1);
        setForumUpvoted(true);
        alert(err.message);
      }
    } else {
      setForumUpvotes(prev => prev + 1);
      setForumUpvoted(true);
      try {
        await upvoteForum(id);
      } catch (err) {
        setForumUpvotes(prev => prev - 1);
        setForumUpvoted(false);
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <NotFound />;
  if (!forum) return <div className="p-4">Forum not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <div className="text-sm text-gray-500 mb-4">By {forum.author_name} • {moment(forum.created_at).fromNow()}</div>
      <h2 className="text-2xl font-bold mb-2">{forum.title}</h2>
      <div className="mb-6">{forum.content}</div>
      <button
        onClick={handleForumUpvote}
        className={`flex items-center gap-1 px-2 py-1 mb-4 rounded-md transition-all duration-200 cursor-pointer ${
          forumUpvoted 
          ? 'bg-green-600 text-white border border-green-600' 
          : 'bg-green-50 text-green-700 hover:bg-green-100'
        }`}
      >
        <svg className={`w-4 h-4 transition-transform duration-200 ${forumUpvoted ? 'transform scale-110' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="font-medium text-xs">{forumUpvotes}</span>
      </button>
      <hr className="mb-4" />
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <form onSubmit={handleCommentSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded px-2 py-1"
          disabled={postingComment}
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded" disabled={postingComment}>
          {postingComment ? 'Posting...' : 'Post'}
        </button>
      </form>
      <div className="space-y-4">
        {comments.length === 0 && <div className="text-gray-500 italic">No comments yet.</div>}
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            depth={0}
            onReplyToggle={handleReplyToggle}
            onReplyInputChange={handleReplyInputChange}
            onReplySubmit={handleReplySubmit}
            onUpvote={handleCommentUpvote}
            replyFormOpen={replyForms}
            replyInputValue={replyInputs}
            postingReply={postingReply}
            commentUpvotes={commentUpvotes}
            commentUpvoted={commentUpvoted}
          />
        ))}
      </div>
    </div>
  );
}

function buildCommentTree(comments) {
  const map = {};
  const roots = [];
  comments.forEach(comment => {
    map[comment.id] = { ...comment, replies: [] };
  });
  comments.forEach(comment => {
    if (comment.parent_comment_id) {
      const parent = map[comment.parent_comment_id];
      if (parent) {
        parent.replies.push(map[comment.id]);
      }
    } else {
      roots.push(map[comment.id]);
    }
  });
  return roots;
}

export default ForumPage; 