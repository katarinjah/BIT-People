import './GenderCounter.css';

export const GenderCounter = ({female, male}) => {
    return (
        <div id="gender-counter">Male: {male} Female: {female}</div>
    )
}