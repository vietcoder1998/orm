export function parseID(id?: string): string {
    var buffer = new Buffer(id, 'utf16le');
    var myBuffer: string ="";
    for (var i = 0; i < buffer.length; i++) {
        myBuffer+=buffer[i];
    }

    return myBuffer;
}