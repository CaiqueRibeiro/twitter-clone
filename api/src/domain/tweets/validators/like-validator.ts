import * as yup from 'yup'
import EntityValidator from '@domain/@shared/entity-validator'
import { Like } from '../value-objects/like';

class LikeValidator implements EntityValidator<Like> {
  validate(entity: Like): void {
    try {
      yup
        .object()
        .shape({
          tweetId: yup.string().required('Tweet ID is required'),
          userId: yup.string().required('User ID is required'),
          timestamp: yup.date().required('Tweet publication date is required'),
        })
        .validateSync(
          {
            tweetId: entity.tweetId.value,
            userId: entity.userId.value,
            timestamp: entity.timestamp,
          },
          {
            abortEarly: false
          });
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'like',
          message: error,
        });
      });
    }
  }
}

export { LikeValidator }
