import * as yup from 'yup'
import { Feed } from '../entities/feed'
import EntityValidator from '@domain/@shared/entity-validator'

class FeedValidator implements EntityValidator<Feed> {
  validate(entity: Feed): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required'),
          userId: yup.string().required('Author ID is required'),
        })
        .validateSync(
          {
            id: entity.id.value,
            userId: entity.userId.value,
          },
          {
            abortEarly: false,
          },
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'feed',
          message: error,
        })
      })
    }
  }
}

export { FeedValidator }
