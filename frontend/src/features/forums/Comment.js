import React, { useState } from 'react';
import moment from 'moment';

const Comment = ({
  comment,
  depth = 0,
  onReplyToggle,
  onReplyInputChange,
  onReplySubmit,
  onUpvote,
  replyFormOpen,
  replyInputValue,
  postingReply,
  commentUpvotes,
  commentUpvoted,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={`border rounded p-2 mb-2 ml-${depth * 4}`} style={{ marginLeft: depth * 16 }}>
      <div className="font-medium">{comment.author}</div>
      <div className="text-sm text-gray-700 mb-1">{comment.content}</div>
      <div className="text-xs text-gray-400 mb-2">{moment(comment.created_at).fromNow()}</div>
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => onUpvote(comment.id)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${
            commentUpvoted[comment.id]
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${commentUpvoted[comment.id] ? 'transform scale-110' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-xs">{commentUpvotes[comment.id] || 0}</span>
        </button>
        <button
          onClick={() => onReplyToggle(comment.id)}
          className={`flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer ${replyFormOpen === comment.id ? 'ring-2 ring-blue-300' : ''}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-xs">Reply</span>
        </button>
        {hasReplies && (
          <button
            onClick={() => setShowReplies((prev) => !prev)}
            className="text-xs text-blue-600 underline ml-2"
          >
            {showReplies ? 'Hide Replies' : `View Replies (${comment.replies.length})`}
          </button>
        )}
      </div>
      {/* Reply form */}
      {replyFormOpen === comment.id && (
        <form className="mt-2 flex gap-1" onSubmit={e => onReplySubmit(e, comment.id)}>
          <input
            type="text"
            placeholder="Reply..."
            className="flex-1 border border-gray-200 rounded px-1 py-0.5 text-xs"
            value={replyInputValue[comment.id] || ''}
            onChange={e => onReplyInputChange(comment.id, e.target.value)}
            disabled={postingReply}
          />
          <button type="submit" className="bg-gray-200 text-xs px-2 rounded" disabled={postingReply}>
            {postingReply ? 'Replying...' : 'Reply'}
          </button>
        </form>
      )}
      {/* Replies (recursive) */}
      {hasReplies && showReplies && (
        <div className="mt-2 ml-4 border-l pl-2">
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReplyToggle={onReplyToggle}
              onReplyInputChange={onReplyInputChange}
              onReplySubmit={onReplySubmit}
              onUpvote={onUpvote}
              replyFormOpen={replyFormOpen}
              replyInputValue={replyInputValue}
              postingReply={postingReply}
              commentUpvotes={commentUpvotes}
              commentUpvoted={commentUpvoted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment; 