import { ObjectID } from './object-id';

export abstract class Entity<Props> {
  private _id: ObjectID;
  protected props: Props;

  get id() {
    return this._id;
  }

  get stringifiedId() {
    return this._id.toString();
  }

  protected constructor(props: Props, id?: ObjectID) {
    this.props = props;
    this._id = id ?? new ObjectID(id);
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) return true;

    if (entity._id === this._id) return true;

    return false;
  }
}
