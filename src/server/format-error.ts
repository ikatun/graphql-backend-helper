import { formatError as defaultFormatError } from 'graphql';
import { captureException, setContext } from 'raven';
import { IRequestContext } from '../shared/IRequestContext';

export function formatError(error) {
  const result = defaultFormatError(error);
  const originalError = error && error.originalError;
  if (originalError && originalError.isValidationError) {
    Object.assign(result, originalError);
  }

  return result;
}

export async function ravenMiddleware(resolve, root, args, context: IRequestContext, info) {
  try {
    return await resolve(root, args, context, info);
  } catch (e) {
    if (!e.isValidationError) {
      const { request, user } = context;
      setContext({
        request,
        user: user ? { id: user.id } : 'Not logged in',
      });
      captureException(e);
    }
    throw e;
  }
}
