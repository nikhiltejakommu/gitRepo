import './index.css'

const LanguageFilterItem = props => {
  const {languageData} = props
  const {id, language} = languageData

  return (
    <div>
      <button className="language-item" type="button">
        {language}
      </button>
    </div>
  )
}

export default LanguageFilterItem
