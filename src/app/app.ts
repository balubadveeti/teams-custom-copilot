import { CardFactory, MemoryStorage, TurnContext } from "botbuilder";
import * as path from "path";
import config from "../config";

// See https://aka.ms/teams-ai-library to learn more about the Teams AI library.
import {
  Application,
  ActionPlanner,
  OpenAIModel,
  PromptManager,
  TurnState,
  PredictedSayCommand,
  AI,
  DefaultConversationState,
  DefaultTempState,
  DefaultUserState,
} from "@microsoft/teams-ai";
import { MyDataSource } from "./myDataSource";

// Create AI components
const model = new OpenAIModel({
  azureApiKey: config.azureOpenAIKey,
  azureDefaultDeployment: config.azureOpenAIDeploymentName,
  azureEndpoint: config.azureOpenAIEndpoint,

  useSystemMessages: true,
  logRequests: true,
});
console.log("model is", model);
const prompts = new PromptManager({
  promptsFolder: path.join(__dirname, "../prompts"),
});
console.log("prompt", prompts);
const planner = new ActionPlanner<TurnState>({
  model,
  prompts,
  defaultPrompt: "chat",
});
console.log("planner", planner);
let app: Application<
  TurnState<DefaultConversationState, DefaultUserState, DefaultTempState>
>;
// Register your data source with planner
const myDataSource = new MyDataSource("my-ai-search");
myDataSource.init();
planner.prompts.addDataSource(myDataSource);

// Define storage and application
const storage = new MemoryStorage();
app = new Application<TurnState>({
  storage,
  ai: {
    planner,
  },
});

app.ai.action<PredictedSayCommand>(
  AI.SayCommandActionName,
  async (_context: any, _state: any, _data: any) => {
    console.log("can you consider me");
    const userInput = JSON.parse(_data.response);
    if (userInput?.intent === "Skills") {
      console.log("skills is", userInput.skills);
      const attachment = handleSkillData(userInput.skills);
      return await _context.sendActivity(attachment);
    }
    return _context.sendActivity(_data.response);
  }
);

app.ai.action("selectSkill", async (_context: any, _state: any, _data: any) => {
  console.log("data is for response", _data);
  return _context.sendActivity(_data.response);
});

function handleSkillData(skills) {
  const adaptiveCard = {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.3",
    body: [
      {
        type: "TextBlock",
        text: "Skills",
        weight: "Bolder",
        size: "Medium",
      },
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            text: "Select a skill to learn more",
            wrap: true,
          },
        ],
      },
    ],
    actions: [],
  };

  // Loop through the skills array and add buttons dynamically
  for (let skill of skills) {
    adaptiveCard.actions.push({
      type: "Action.Submit",
      title: skill.name,
      data: {
        action: "selectSkill",
        skillName: skill.name,
        skillDescription: skill.description,
      },
    });
  }
  const card = CardFactory.adaptiveCard(adaptiveCard);
  const message = {
    type: "message",
    attachments: [card],
  };
  return message;
}

export default app;
