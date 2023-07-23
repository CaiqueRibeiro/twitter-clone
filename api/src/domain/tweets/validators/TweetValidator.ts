import * as yup from 'yup'
import { Tweet } from '../entities/tweet'
import EntityValidator from '@domain/@shared/entity-validator'

class TweetValidator implements EntityValidator<Tweet> {
  validate(entity: Tweet): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required'),
          authorId: yup.string().required('Author ID is required'),
          content: yup.string().required('Content is required'),
          timestamp: yup.date().required('Tweet date is required')
        })
        .validateSync(
          {
            id: entity.id.value,
            authorId: entity.authorId.value,
            content: entity.content,
            timestamp: entity.timestamp
          },
          {
            abortEarly: false
          });
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'tweet',
          message: error,
        });
      });
    }
  }
}

export { TweetValidator }