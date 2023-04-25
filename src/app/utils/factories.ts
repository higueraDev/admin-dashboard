import { Collections } from '../enums/collections';
import { Physician } from '../models/Physician';
import { Hospital } from '../models/hospital';
import { User } from '../models/user';

export class Factories {
  private static types = {
    [Collections.USERS]: Factories.buildUser,
    [Collections.HOSPITALS]: Factories.buildHospital,
    [Collections.PHYSICIANS]: Factories.buildPhysician,
  };

  static buildUser(user: User) {
    return new User(
      user.uid,
      user.name,
      user.email,
      user.google,
      user.role,
      user.image
    );
  }

  static buildHospital(hospital: Hospital) {
    return new Hospital(
      hospital.uid,
      hospital.name,
      hospital.createdBy,
      hospital.image
    );
  }

  static buildPhysician(physician: Physician) {
    return new Physician(
      physician.uid,
      physician.name,
      physician.createdBy,
      physician.hospital,
      physician.image
    );
  }

  static build(collection: Collections, item: any) {
    return Factories.types[collection](item);
  }
}
