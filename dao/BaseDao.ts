export default interface IBaseDAO<T> {
    getAll(): any;
    getOne(): any;
    getMany(): any;
    save(): any;
    update(): any;
    delete(): any;
}