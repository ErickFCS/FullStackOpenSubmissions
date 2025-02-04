import { CoursePart } from '../types/CoursePart';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    const result = [
        <h3>Name: {coursePart.name}</h3>,
        <p>Kind: {coursePart.kind}</p>,
        <p>Exercise Count: {coursePart.exerciseCount}</p>,
    ];
    switch (coursePart.kind) {
    case 'basic':
        result.push(<p>Description: {coursePart.description}</p>);
        break;
    case 'group':
        result.push(<p>groupProjectCount: {coursePart.groupProjectCount}</p>);
        break;
    case 'background':
        result.push(...[
            <p>Description: {coursePart.description}</p>,
            <p>backgroundMaterial: {coursePart.backgroundMaterial}</p>
        ]);
        break;
    case 'special':
        result.push(...[
            <p>Description: {coursePart.description}</p>,
            <p>Requirements: {coursePart.requirements.join(' ')}</p>
        ]);
        break;
    default:
        assertNever(coursePart);
        break;
    }
    return (
        <>
            {result}
        </>
    );
};

export default Part;