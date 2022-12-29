import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    status: apiStatus.initial,
    language: languageFiltersData[0].id,
    repoList: [],
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {language} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=ALL`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
  }

  switchCaseStatement = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.successStatus()
      case apiStatus.failure:
        return this.failureView()
      case apiStatus.inProgress:
        return this.inprogress()
      default:
        return null
    }
  }

  render() {
    const {language, status} = this.state
    return (
      <>
        <div>
          <h1>Popular</h1>
          <div className="languageFilterItem-container">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                languageData={eachLanguage}
                key={eachLanguage.id}
              />
            ))}
          </div>
        </div>
        <div>{this.switchCaseStatement()}</div>
      </>
    )
  }
}

export default GithubPopularRepos
