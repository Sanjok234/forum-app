export const FORUM_CONSTRAINTS = {
  TITLE_MAX_LENGTH: 100,
  CONTENT_MAX_LENGTH: 2000,
  MIN_TITLE_LENGTH: 3,
  MIN_CONTENT_LENGTH: 10
};

export const FORUM_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

export const FORUM_ERROR_MESSAGES = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_TOO_SHORT: `Title must be at least ${FORUM_CONSTRAINTS.MIN_TITLE_LENGTH} characters`,
  TITLE_TOO_LONG: `Title must be ${FORUM_CONSTRAINTS.TITLE_MAX_LENGTH} characters or less`,
  CONTENT_REQUIRED: 'Content is required',
  CONTENT_TOO_SHORT: `Content must be at least ${FORUM_CONSTRAINTS.MIN_CONTENT_LENGTH} characters`,
  CONTENT_TOO_LONG: `Content must be ${FORUM_CONSTRAINTS.CONTENT_MAX_LENGTH} characters or less`
}; 