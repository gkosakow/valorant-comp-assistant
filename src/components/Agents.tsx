import { useState, useEffect } from "react";
import AgentButton from "./AgentButton";

// defining the Agent interface to store the agent ID, name, image, and role
export interface Agent {
	agentID: string,
	agentName: string,
	agentImage: string,
	agentRole: string,
	agentRoleIcon: string
}

const Agents = () => {
	const [agentList, setAgentList] = useState<Agent[]>([]);

	// function to use agents valorant API to update dynamically with every new agent
	useEffect(() => {
		async function retrieveAgents() {
			const agentURL = "https://valorant-api.com/v1/agents"
			const response = await fetch(agentURL);
			const agentData = await response.json();

			let updatedAgentList: Agent[] = []

			// fills the agents array with responses from agents API besides The Range
			agentData.data.map((agent: any) => {
				if (agent.uuid !== "ded3520f-4264-bfed-162d-b080e2abccf9") {
					updatedAgentList.push({ agentID: agent.uuid, agentName: agent.displayName, agentImage: agent.displayIcon, agentRole: agent.role.displayName, agentRoleIcon: agent.role.displayIcon });
				}
			})

			// sorts agents array alphabetically
			updatedAgentList.sort((a, b) => a.agentName.localeCompare(b.agentName))

			// setting agentList to updatedAgentList
			setAgentList(updatedAgentList);
		};

		// error handling to console
		retrieveAgents().catch(error => {
			console.error("Agent API error!", error);
		});
	}, []);

	return (
		<div className="button-row">
			<AgentButton agentList={agentList} />
			<AgentButton agentList={agentList} />
			<AgentButton agentList={agentList} />
			<AgentButton agentList={agentList} />
			<AgentButton agentList={agentList} />
		</div>
	)
}

export default Agents;