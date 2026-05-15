// This is the "Model" you remembered!
const starterQuests = [
    { id: 101, title: "Drink Water (80oz)", description: "Stay hydrated for maximum brain power.", difficulty: "Trivial", xp: 5, category: "Health", dueDate: "", completed: false },
    { id: 102, title: "Study JavaScript", description: "Complete one chapter of the tutorial.", difficulty: "Medium", xp: 25, category: "Education", dueDate: "", completed: false }
];

window.gameState = {
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    questsCompleted: 0,
    habitScore: 0,
    streak: 7,
    customQuests: starterQuests, // We inject the model here!
    unlockedAchievements: []
};

window.achievementDefinitions = [
    { id: 'first_quest', title: 'First Quest Completed', desc: 'Slayed your very first task!', icon: '🥇', type: 'quests', value: 1 },
    { id: 'seven_streak', title: '7-Day Streak', desc: 'On fire for a solid week!', icon: '🔥', type: 'streak', value: 7 }
];

window.addEventListener('DOMContentLoaded', () => {
    const savedState = Storage.load();
    if (savedState) {
        window.gameState = {
            ...window.gameState,
            ...savedState,
            // If they have saved quests, use them. Otherwise, use our starter model.
            customQuests: savedState.customQuests && savedState.customQuests.length > 0 ? savedState.customQuests : starterQuests,
            unlockedAchievements: savedState.unlockedAchievements || []
        };
    }
    
    checkAchievements(true);
    UI.update(window.gameState);
    
    if (document.getElementById('dynamic-quest-list')) {
        renderCustomQuests();
    }
});