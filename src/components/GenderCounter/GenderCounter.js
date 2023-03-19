import './GenderCounter.css';

export const GenderCounter = ({female, male}) => {
    return (
        <div className="row justify-content-end" id="gender-counter">Male: {male} Female: {female}</div>
    )
}