

const Content = ({ courseParts }: { courseParts: { name: string; exerciseCount: number; }[] }) => {
    return (
        <>
            {courseParts.map((e, i) => (
                <p key={i}>
                    {e.name} {e.exerciseCount}
                </p>
            ))}
        </>
    );
};

export default Content;