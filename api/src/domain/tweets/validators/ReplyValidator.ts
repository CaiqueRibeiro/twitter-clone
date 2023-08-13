import * as yup from 'yup'
import { Reply } from '../entities/reply'
import EntityValidator from '@domain/@shared/entity-validator'

class ReplyValidator implements EntityValidator<Reply> {
  validate(entity: Reply): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required'),
          tweetId: yup.string().required('Tweet ID is required'),
          userId: yup.string().required('User ID is required'),
          content: yup.string().required('Content is required'),
          timestamp: yup.date().required('Tweet publication date is required'),
        })
        .validateSync(
          {
            id: entity.id.value,
            tweetId: entity.tweetId,
            userId: entity.userId.value,
            content: entity.content,
            timestamp: entity.timestamp,
          },
          {
            abortEarly: false
          });
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'reply',
          message: error,
        });
      });
    }
  }
}

export { ReplyValidator }