/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
// tslint:disable max-line-length
import { asPromise } from '../../../../utils/as-promise';
import { IRequestContext } from '../../../shared/IRequestContext';
import { User } from '../../../User/models/User';
import { FileNestedInput } from '../../../File/inputs/FileNestedInput';
import { File } from '../../../File/models/File';

export async function updateProfileImageRelation(user: User, profileImage: FileNestedInput | null | undefined, context: IRequestContext) {
  const existingProfileImage = await user.profileImage;

  if (profileImage === null) {
    user.profileImage = Promise.resolve(null);
  } else if (profileImage === undefined) {
    // do nothing
  } else if (profileImage.id) {
    const profileImageModel = await context.em.findOneOrFail(File, profileImage.id);
    user.profileImage = asPromise(await profileImageModel.update(profileImage, context));
  } else if (existingProfileImage) {
    await existingProfileImage.update(profileImage, context);
  } else {
    user.profileImage = asPromise(await new File().update(profileImage, context));
  }
}
