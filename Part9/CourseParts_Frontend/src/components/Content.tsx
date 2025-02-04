import Part from './Part';
import { CoursePart } from '../types/CoursePart';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <>
            {courseParts.map((e, i) => (
                <Part key={i} coursePart={e} />
            ))}
        </>
    );
};

export default Content;