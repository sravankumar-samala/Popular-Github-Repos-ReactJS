// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languagesTabObject, isActive, onTabClicked} = props
  const {id, language} = languagesTabObject
  const activeTabClassName = isActive ? 'tab-active-btn' : ''

  return (
    <li className="tab-item">
      <button
        type="button"
        className={`tab-btn ${activeTabClassName}`}
        onClick={() => onTabClicked(id)}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
