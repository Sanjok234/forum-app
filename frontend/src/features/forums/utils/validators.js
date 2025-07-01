import { FORUM_CONSTRAINTS, FORUM_ERROR_MESSAGES } from '../constants/forumConstants';

export function validateForumForm(form) {
  const errors = {};
  
  // Title validation
  if (!form.title?.trim()) {
    errors.title = FORUM_ERROR_MESSAGES.TITLE_REQUIRED;
  } else if (form.title.trim().length < FORUM_CONSTRAINTS.MIN_TITLE_LENGTH) {
    errors.title = FORUM_ERROR_MESSAGES.TITLE_TOO_SHORT;
  } else if (form.title.length > FORUM_CONSTRAINTS.TITLE_MAX_LENGTH) {
    errors.title = FORUM_ERROR_MESSAGES.TITLE_TOO_LONG;
  }
  
  // Content validation
  if (!form.content?.trim()) {
    errors.content = FORUM_ERROR_MESSAGES.CONTENT_REQUIRED;
  } else if (form.content.trim().length < FORUM_CONSTRAINTS.MIN_CONTENT_LENGTH) {
    errors.content = FORUM_ERROR_MESSAGES.CONTENT_TOO_SHORT;
  } else if (form.content.length > FORUM_CONSTRAINTS.CONTENT_MAX_LENGTH) {
    errors.content = FORUM_ERROR_MESSAGES.CONTENT_TOO_LONG;
  }
  
  return errors;
}

export function validateTitle(title) {
  if (!title?.trim()) {
    return FORUM_ERROR_MESSAGES.TITLE_REQUIRED;
  }
  if (title.trim().length < FORUM_CONSTRAINTS.MIN_TITLE_LENGTH) {
    return FORUM_ERROR_MESSAGES.TITLE_TOO_SHORT;
  }
  if (title.length > FORUM_CONSTRAINTS.TITLE_MAX_LENGTH) {
    return FORUM_ERROR_MESSAGES.TITLE_TOO_LONG;
  }
  return null;
}

export function validateContent(content) {
  if (!content?.trim()) {
    return FORUM_ERROR_MESSAGES.CONTENT_REQUIRED;
  }
  if (content.trim().length < FORUM_CONSTRAINTS.MIN_CONTENT_LENGTH) {
    return FORUM_ERROR_MESSAGES.CONTENT_TOO_SHORT;
  }
  if (content.length > FORUM_CONSTRAINTS.CONTENT_MAX_LENGTH) {
    return FORUM_ERROR_MESSAGES.CONTENT_TOO_LONG;
  }
  return null;
} 