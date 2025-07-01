import { useCallback } from 'react';
import { useApi } from '../../../shared/hooks';
import { createForum, updateForum, fetchForumById } from '../../../api/forum';

export function useForumActions() {
  const createForumApi = useApi(createForum);
  const updateForumApi = useApi(updateForum);
  const fetchForumApi = useApi(fetchForumById);

  const createForumAction = useCallback(async (forumData) => {
    return createForumApi.execute(forumData);
  }, [createForumApi]);

  const updateForumAction = useCallback(async (id, forumData) => {
    return updateForumApi.execute(id, forumData);
  }, [updateForumApi]);

  const fetchForumAction = useCallback(async (id) => {
    return fetchForumApi.execute(id);
  }, [fetchForumApi]);

  return {
    // Create operations
    createForum: createForumAction,
    createLoading: createForumApi.loading,
    createError: createForumApi.error,
    
    // Update operations
    updateForum: updateForumAction,
    updateLoading: updateForumApi.loading,
    updateError: updateForumApi.error,
    
    // Fetch operations
    fetchForum: fetchForumAction,
    fetchLoading: fetchForumApi.loading,
    fetchError: fetchForumApi.error,
    
    // Combined loading state
    loading: createForumApi.loading || updateForumApi.loading || fetchForumApi.loading,
    
    // Reset functions
    resetCreate: createForumApi.reset,
    resetUpdate: updateForumApi.reset,
    resetFetch: fetchForumApi.reset
  };
} 