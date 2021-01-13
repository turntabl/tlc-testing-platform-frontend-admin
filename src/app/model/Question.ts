export class Question{
    testId: number;
    question: string;
    option: string[] = [];
    user_id: string;
    validAnswer: string;
    mark_allocated: number;
}