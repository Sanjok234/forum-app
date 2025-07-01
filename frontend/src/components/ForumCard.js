import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { upvoteForum, removeUpvoteForum } from '../api/forum';

function ForumCard({ id, title, author_name, content, upvote_count, comment_count, created_at, is_upvoted, onEdit }) {
  const [showComments, setShowComments] = useState(false);
  const [upvotes, setUpvotes] = useState(upvote_count);
  const [isUpvoted, setIsUpvoted] = useState(is_upvoted);
  const navigate = useNavigate();
  
  const handleUpvote = async () => {
    if (isUpvoted) {
      setUpvotes(prev => prev - 1);
      setIsUpvoted(false);
      try {
        await removeUpvoteForum(id);
      } catch (err) {
        setUpvotes(prev => prev + 1);
        setIsUpvoted(true);
        alert(err.message);
      }
    } else {
      setUpvotes(prev => prev + 1);
      setIsUpvoted(true);
      try {
        await upvoteForum(id);
      } catch (err) {
        setUpvotes(prev => prev - 1);
        setIsUpvoted(false);
        alert(err.message);
      }
    }
  };

  const handleCommentToggle = () => {
    navigate(`/forums/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden mb-4">
      {/* Top section with author info and time */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-2 text-white">
        <div className="flex items-center justify-between">
          {/* Author and time on the left */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">{author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-blue-100">{moment(created_at).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
          {title}
        </h3>

        {/* Content */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {content.length > 200 ? `${content.substring(0, 200)}...` : content}
        </p>

        {/* Stats and actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100 justify-between">
          <div className="flex items-center gap-4">
            {/* Upvote - clickable icon with toggle state */}
            <button 
              onClick={handleUpvote}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                isUpvoted 
                  ? 'bg-green-600 text-white border border-green-600' 
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              <svg className={`w-4 h-4 transition-transform duration-200 ${isUpvoted ? 'transform scale-110' : ''}`} 
                fill={isUpvoted ? 'white' : 'currentColor'} viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-xs">{upvotes}</span>
            </button>

            {/* Comments - clickable icon */}
            <button 
              onClick={handleCommentToggle}
              className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-xs">{comment_count}</span>
            </button>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-semibold px-4 py-1 rounded-full transition-all duration-150 text-xs"
            >
              Edit
            </button>
          )}
        </div>

        {/* Comments section - collapsible */}
        {showComments && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="bg-gray-50 rounded-md p-3">
              <h4 className="font-medium text-gray-800 mb-2 text-sm">Comments</h4>
              <div className="space-y-2">
                {/* Comment input */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm">
                    Forum
                  </button>
                </div>
                
                {/* Sample comments - replace with actual comments */}
                <div className="text-gray-500 text-xs italic">
                  No comments yet. Be the first to comment!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumCard; 