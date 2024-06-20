import { ActivityHandler, Attachment, AttachmentLayoutTypes, CardFactory, TurnContext } from 'botbuilder';
import SearchService from '../service/search.service';
let searchClient ;
class MyBot extends ActivityHandler {
   
  constructor() {
    super();
     searchClient = new SearchService();
    this.onMessage(async (context, next) => {
      const actionData = context.activity.value;

      if (actionData && actionData.action === 'selectSkill') {
        await this.handleSkillSelection(context, actionData);
      }

      await next();
    });
  }

  private async handleSkillSelection(context: TurnContext, actionData: any) {
    const skillName = actionData.skillName;
    const skillDescription = actionData.skillDescription;

    try {
      const response = await searchClient.fetchSkillBasedRecommendations(skillName, skillDescription);
      console.log('respons is', response.data.data.skillBasedRecommendationsV2.recommendations)
      const recommendations = response.data.data.skillBasedRecommendationsV2.recommendations;

      const attachments = recommendations.flatMap((recommendation: any) => 
        recommendation.results.map((result: any) => this.createSearchCard(result))
      );

      await context.sendActivity({
        attachments,
        attachmentLayout: AttachmentLayoutTypes.Carousel,
      });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      await context.sendActivity('Sorry, something went wrong while fetching recommendations.');
    }
  }


  
private createSearchCard (searchResult): Attachment {
    const { url, title, imageUrl, category, description, imgData } = searchResult;
    // const { searchInstruction, getStartedText } = localizedData;
    //const launchURL = getURL(url, initChannelName);

    const searchCard = {
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        type: 'AdaptiveCard',
        version: '1.6',
        body: [
            {
                type: 'TextBlock',
                size: 'Medium',
                text: 'See more search results by scrolling left or right',
                wrap: true,
            },
            {
                type: 'ColumnSet',
                spacing: 'medium',
                columns: [
                    {
                        type: 'Column',
                        width: 2,
                        items: [
                            {
                                type: 'Image',
                                url: imgData || imageUrl,
                                altText: '',
                                size: 'auto',
                            },
                        ],
                    },
                    {
                        type: 'Column',
                        width: 2,
                        items: [
                            {
                                type: 'TextBlock',
                                text: title,
                                weight: 'bolder',
                                size: 'medium',
                                spacing: 'none',
                                wrap: true,
                            },
                            {
                                type: 'TextBlock',
                                text: category,
                                isSubtle: true,
                                spacing: 'small',
                                wrap: true,
                            },
                            {
                                type: 'TextBlock',
                                text: description ?this.getDescription(description) : '',
                                size: 'small',
                                wrap: true,
                                maxLines: 3,
                            },
                        ],
                    },
                ],
            },
        ],
        actions: [
            {
                type: 'Action.OpenUrl',
                title: 'Launch Course',
            },
        ],
    };
    return CardFactory.adaptiveCard(searchCard);
};

private getDescription (text) {
    let t = text.replace(/<[^>]*>?/gm, '');
    if (t.length > 100) {
        t = `${t.substr(0, 100)}...`;
    }
    return t;
};
}

export default MyBot;