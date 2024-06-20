import axios from 'axios'

export default class SearchService {
    public async fetchSkillBasedRecommendations(skillName: string, skillDescription: string) {
        const query = `
          query skillBasedRecommendationsV2($skills: [String]!, $locale: String, $maxResultsPerSkill: Int, $bucketByCategory: Boolean) {
            skillBasedRecommendationsV2(
              skills: $skills
              locale: $locale
              maxResultsPerSkill: $maxResultsPerSkill
              bucketByCategory: $bucketByCategory
            ) {
              excludedContentUuids
              recommendations {
                skill
                category
                results {
                  contentUuid
                  contentType
                  title
                  description
                  imageUrl
                  imageAltText
                  languageCode
                  locale
                  technologyTitle
                  technologyVersion
                  plannedRetirementDate
                  sourceName
                  category
                  launchSource
                  launchTarget
                  url
                  duration
                  complianceCourse
                  code
                  ownerUuid
                  jobRoleFamily
                  skills
                }
              }
            }
          }
        `;
    
        const variables = {
          skills: [skillName + ' ' + skillDescription],
          locale: 'en-US',
          maxResultsPerSkill: 5,
          bucketByCategory: true,
        };
    
        const headers = {
          'x-sks-user-id': '013e1e9a-47f2-4916-aebb-f3a3c2bbe171',
          'x-sks-org-id': '2e07c481-e6e4-438b-9cbc-e20deab3d806',
          'Authorization': 'Basic cGluZzpQb25nMzIxIQ==',
          'Content-Type': 'application/json',
        };
    
        return axios.post('https://content-search-recommendations.develop.squads-dev.com/graphql', {
          query,
          variables,
        }, { headers });
      }
}

