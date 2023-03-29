export interface TagQuery{
    inname?:string
}
export interface Tag{
    count:number;
    name:string;
    is_required:boolean;
    is_moderator_only:boolean;
    has_synonyms:boolean
}