import { SubmissionData } from '../types';

export const mockSubmitApi = (data: SubmissionData): Promise<SubmissionData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(data);
      } else {
        reject(new Error('Failed to save data. Please try again.'));
      }
    }, 2000);
  });
};
