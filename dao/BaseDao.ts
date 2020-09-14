export default interface IBaseDAO<T> {
    getOne(): any;
    getMany(): any;
    create(): any;
    update(): any;
    delete(): any;
}