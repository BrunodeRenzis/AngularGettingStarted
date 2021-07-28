import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name:'convertToEncode'  
})

export class ConvertToEncodePipe implements PipeTransform{
    transform(value:string, character:string){
        return value.replace(character,'*');
    }
}
