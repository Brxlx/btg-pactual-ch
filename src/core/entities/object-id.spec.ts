import { ObjectID } from './object-id';

describe('ObjectId Test', () => {
  it('should be able to create a new ObjectId', async () => {
    const newObjectId = new ObjectID();
    // console.log(newObjectId);

    const newObjectId2 = new ObjectID();
    // console.log(newObjectId2);

    const newObjectId3 = new ObjectID()._unsafeGenerateObjectId();
    // console.log(newObjectId3);

    expect(newObjectId).toBeInstanceOf(ObjectID);
    expect(newObjectId.toString().length).toEqual(24);
    expect(newObjectId.isValid()).toBeTruthy();
    expect(newObjectId2.isValid()).toBeTruthy();
    expect(new ObjectID(newObjectId3).isValid()).toBeTruthy();
  });

  it('should not be able to create a new ObjectId from invalid string length', async () => {
    const newObjectId = new ObjectID('23223dqwede3122222222222');
    // console.log(newObjectId);

    expect(new ObjectID(newObjectId.toValue()).isValid()).toBeFalsy();
  });
});
