import * as yup from 'yup'
import EntityValidator from '@domain/@shared/entity-validator'
import { User } from '../entities/user'

class UserValidator implements EntityValidator<User> {
  validate(entity: User): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required'),
          email: yup.string().required('User email is required'),
          username: yup.string().required('Username is required'),
          profileImage: yup.string(),
          createdAt: yup.date().required('Tweet publication date is required'),
          updatedAt: yup.date().required('Tweet last update date is required'),
        })
        .validateSync(
          {
            id: entity.id.value,
            email: entity.email,
            username: entity.username,
            profileImage: entity.profileImage,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
          },
          {
            abortEarly: false,
          },
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'user',
          message: error,
        })
      })
    }
  }
}

export { UserValidator }
