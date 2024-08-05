import {uploadRecordFile2} from '@/api/model/model';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

function useMutateUploadRecord(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadRecordFile2,
    ...mutationOptions,
  });
}

export default useMutateUploadRecord;
