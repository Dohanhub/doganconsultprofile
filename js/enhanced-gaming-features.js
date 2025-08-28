/**
 * Enhanced Gaming Features for DoganConsult
 * Implementing the remaining 4 planned features:
 * 1. Strategy Puzzles
 * 2. Value Demonstration Games
 * 3. Custom Solution Builder
 * 4. Challenge-based Forms
 */

class DoganConsultGamingFeatures {
    constructor() {
        this.currentPuzzle = null;
        this.solutionBuilder = null;
        this.challengeForm = null;
        this.valueGames = null;
        this.userScore = 0;
        this.gameHistory = [];
    }

    // 1. Strategy Puzzles Implementation
    initializeStrategyPuzzles() {
        const puzzles = [
            {
                id: 'puzzle-1',
                title: 'Market Entry Strategy',
                description: 'You need to enter a new market with limited resources. Choose the optimal strategy.',
                scenario: 'Your company wants to expand into the Saudi healthcare market. You have a budget of 5M SAR and 6 months timeline.',
                options: [
                    {
                        text: 'Direct market entry with full-service offering',
                        cost: 5,
                        risk: 'High',
                        reward: 'High',
                        correct: false
                    },
                    {
                        text: 'Partnership with local healthcare provider',
                        cost: 3,
                        risk: 'Medium',
                        reward: 'Medium',
                        correct: true
                    },
                    {
                        text: 'Acquisition of existing small clinic',
                        cost: 4,
                        risk: 'Medium',
                        reward: 'Medium',
                        correct: false
                    },
                    {
                        text: 'Franchise model with local investors',
                        cost: 2,
                        risk: 'Low',
                        reward: 'Low',
                        correct: false
                    }
                ],
                explanation: 'Partnership approach minimizes risk while leveraging local expertise and regulatory knowledge.'
            },
            {
                id: 'puzzle-2',
                title: 'Digital Transformation Priority',
                description: 'Prioritize digital transformation initiatives for maximum impact.',
                scenario: 'Your manufacturing company needs digital transformation. You can implement 2 out of 4 initiatives.',
                options: [
                    {
                        text: 'IoT sensors for predictive maintenance',
                        impact: 'High',
                        cost: 'Medium',
                        timeline: '6 months',
                        correct: true
                    },
                    {
                        text: 'AI-powered quality control',
                        impact: 'High',
                        cost: 'High',
                        timeline: '12 months',
                        correct: true
                    },
                    {
                        text: 'Digital twin for production optimization',
                        impact: 'Medium',
                        cost: 'High',
                        timeline: '18 months',
                        correct: false
                    },
                    {
                        text: 'Blockchain supply chain tracking',
                        impact: 'Low',
                        cost: 'Medium',
                        timeline: '9 months',
                        correct: false
                    }
                ],
                explanation: 'IoT and AI quality control provide immediate ROI and operational benefits.'
            }
        ];

        this.createPuzzleInterface(puzzles);
    }

    createPuzzleInterface(puzzles) {
        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'strategy-puzzle-container';
        puzzleContainer.innerHTML = `
            <div class="puzzle-header">
                <h3>🧩 Strategy Puzzles</h3>
                <p>Test your business strategy skills with interactive puzzles</p>
            </div>
            <div class="puzzle-grid">
                ${puzzles.map(puzzle => `
                    <div class="puzzle-card" data-puzzle-id="${puzzle.id}">
                        <h4>${puzzle.title}</h4>
                        <p>${puzzle.description}</p>
                        <div class="puzzle-scenario">${puzzle.scenario}</div>
                        <button class="start-puzzle-btn" onclick="gamingFeatures.startPuzzle('${puzzle.id}')">
                            Start Puzzle
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(puzzleContainer);
    }

    startPuzzle(puzzleId) {
        const puzzle = this.findPuzzle(puzzleId);
        if (!puzzle) return;

        this.currentPuzzle = puzzle;
        this.showPuzzleModal(puzzle);
    }

    showPuzzleModal(puzzle) {
        const modal = document.createElement('div');
        modal.className = 'puzzle-modal';
        modal.innerHTML = `
            <div class="puzzle-modal-content">
                <div class="puzzle-modal-header">
                    <h3>${puzzle.title}</h3>
                    <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="puzzle-scenario">
                    <h4>Scenario:</h4>
                    <p>${puzzle.scenario}</p>
                </div>
                <div class="puzzle-options">
                    <h4>Choose the best strategy:</h4>
                    ${puzzle.options.map((option, index) => `
                        <div class="puzzle-option" onclick="gamingFeatures.selectPuzzleOption(${index})">
                            <input type="radio" name="puzzle-option" id="option-${index}">
                            <label for="option-${index}">${option.text}</label>
                            ${option.cost ? `<span class="cost">Cost: ${option.cost}M SAR</span>` : ''}
                            ${option.impact ? `<span class="impact">Impact: ${option.impact}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
                <button class="submit-puzzle-btn" onclick="gamingFeatures.submitPuzzleAnswer()">
                    Submit Answer
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    selectPuzzleOption(optionIndex) {
        document.querySelectorAll('input[name="puzzle-option"]').forEach((radio, index) => {
            radio.checked = index === optionIndex;
        });
    }

    submitPuzzleAnswer() {
        const selectedOption = document.querySelector('input[name="puzzle-option"]:checked');
        if (!selectedOption) {
            alert('Please select an option');
            return;
        }

        const optionIndex = Array.from(document.querySelectorAll('input[name="puzzle-option"]')).indexOf(selectedOption);
        const selectedAnswer = this.currentPuzzle.options[optionIndex];
        const isCorrect = selectedAnswer.correct;

        this.showPuzzleResult(isCorrect, selectedAnswer, this.currentPuzzle.explanation);
        this.userScore += isCorrect ? 10 : 0;
        this.updateScore();
    }

    showPuzzleResult(isCorrect, selectedAnswer, explanation) {
        const resultModal = document.createElement('div');
        resultModal.className = 'puzzle-result-modal';
        resultModal.innerHTML = `
            <div class="result-content">
                <div class="result-icon ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✅' : '❌'}
                </div>
                <h3>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                <p><strong>Your choice:</strong> ${selectedAnswer.text}</p>
                <div class="explanation">
                    <h4>Explanation:</h4>
                    <p>${explanation}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()">Continue</button>
            </div>
        `;

        document.body.appendChild(resultModal);
    }

    // 2. Value Demonstration Games Implementation
    initializeValueGames() {
        const valueGames = [
            {
                id: 'roi-simulation',
                title: 'ROI Simulation Game',
                description: 'Simulate different investment scenarios and see their ROI impact',
                type: 'simulation'
            },
            {
                id: 'cost-benefit-challenge',
                title: 'Cost-Benefit Challenge',
                description: 'Balance costs and benefits in real-time scenarios',
                type: 'challenge'
            },
            {
                id: 'value-proposition-builder',
                title: 'Value Proposition Builder',
                description: 'Build compelling value propositions for different customer segments',
                type: 'builder'
            }
        ];

        this.createValueGamesInterface(valueGames);
    }

    createValueGamesInterface(games) {
        const gamesContainer = document.createElement('div');
        gamesContainer.className = 'value-games-container';
        gamesContainer.innerHTML = `
            <div class="games-header">
                <h3>💰 Value Demonstration Games</h3>
                <p>Experience the value of our solutions through interactive games</p>
            </div>
            <div class="games-grid">
                ${games.map(game => `
                    <div class="game-card" data-game-id="${game.id}">
                        <h4>${game.title}</h4>
                        <p>${game.description}</p>
                        <div class="game-type">${game.type}</div>
                        <button class="start-game-btn" onclick="gamingFeatures.startValueGame('${game.id}')">
                            Play Game
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(gamesContainer);
    }

    startValueGame(gameId) {
        switch(gameId) {
            case 'roi-simulation':
                this.startROISimulation();
                break;
            case 'cost-benefit-challenge':
                this.startCostBenefitChallenge();
                break;
            case 'value-proposition-builder':
                this.startValuePropositionBuilder();
                break;
        }
    }

    startROISimulation() {
        const simulationModal = document.createElement('div');
        simulationModal.className = 'simulation-modal';
        simulationModal.innerHTML = `
            <div class="simulation-content">
                <h3>📊 ROI Simulation Game</h3>
                <div class="simulation-controls">
                    <div class="control-group">
                        <label>Investment Amount (SAR):</label>
                        <input type="range" id="investment-amount" min="100000" max="10000000" value="1000000" step="100000">
                        <span id="investment-display">1,000,000 SAR</span>
                    </div>
                    <div class="control-group">
                        <label>Implementation Timeline (months):</label>
                        <input type="range" id="timeline" min="3" max="24" value="12" step="1">
                        <span id="timeline-display">12 months</span>
                    </div>
                    <div class="control-group">
                        <label>Risk Level:</label>
                        <select id="risk-level">
                            <option value="low">Low Risk</option>
                            <option value="medium" selected>Medium Risk</option>
                            <option value="high">High Risk</option>
                        </select>
                    </div>
                </div>
                <div class="simulation-results">
                    <div class="result-card">
                        <h4>Projected ROI</h4>
                        <div id="roi-result">Calculating...</div>
                    </div>
                    <div class="result-card">
                        <h4>Payback Period</h4>
                        <div id="payback-result">Calculating...</div>
                    </div>
                    <div class="result-card">
                        <h4>Net Present Value</h4>
                        <div id="npv-result">Calculating...</div>
                    </div>
                </div>
                <button onclick="gamingFeatures.calculateROI()">Calculate ROI</button>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;

        document.body.appendChild(simulationModal);
        this.setupSimulationControls();
    }

    setupSimulationControls() {
        const investmentSlider = document.getElementById('investment-amount');
        const investmentDisplay = document.getElementById('investment-display');
        const timelineSlider = document.getElementById('timeline');
        const timelineDisplay = document.getElementById('timeline-display');

        investmentSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            investmentDisplay.textContent = value.toLocaleString() + ' SAR';
        });

        timelineSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            timelineDisplay.textContent = value + ' months';
        });
    }

    calculateROI() {
        const investment = parseInt(document.getElementById('investment-amount').value);
        const timeline = parseInt(document.getElementById('timeline').value);
        const riskLevel = document.getElementById('risk-level').value;

        // Calculate ROI based on parameters
        const riskMultipliers = { low: 0.8, medium: 1.0, high: 1.3 };
        const baseROI = 0.25; // 25% base ROI
        const adjustedROI = baseROI * riskMultipliers[riskLevel] * (12 / timeline);
        
        const annualReturn = investment * adjustedROI;
        const paybackPeriod = investment / annualReturn;
        const npv = annualReturn * 5 - investment; // 5-year NPV

        document.getElementById('roi-result').innerHTML = `
            <div class="roi-value">${(adjustedROI * 100).toFixed(1)}%</div>
            <div class="roi-details">Annual Return: ${annualReturn.toLocaleString()} SAR</div>
        `;

        document.getElementById('payback-result').innerHTML = `
            <div class="payback-value">${paybackPeriod.toFixed(1)} years</div>
        `;

        document.getElementById('npv-result').innerHTML = `
            <div class="npv-value">${npv.toLocaleString()} SAR</div>
        `;
    }

    // 3. Custom Solution Builder Implementation
    initializeSolutionBuilder() {
        this.solutionBuilder = {
            components: [
                { id: 'ai-automation', name: 'AI Automation', cost: 500000, impact: 'High' },
                { id: 'data-analytics', name: 'Data Analytics', cost: 300000, impact: 'Medium' },
                { id: 'cloud-migration', name: 'Cloud Migration', cost: 400000, impact: 'High' },
                { id: 'cybersecurity', name: 'Cybersecurity', cost: 250000, impact: 'Medium' },
                { id: 'process-optimization', name: 'Process Optimization', cost: 200000, impact: 'Medium' },
                { id: 'customer-experience', name: 'Customer Experience', cost: 350000, impact: 'High' }
            ],
            selectedComponents: [],
            totalCost: 0,
            totalImpact: 0
        };

        this.createSolutionBuilderInterface();
    }

    createSolutionBuilderInterface() {
        const builderContainer = document.createElement('div');
        builderContainer.className = 'solution-builder-container';
        builderContainer.innerHTML = `
            <div class="builder-header">
                <h3>🔧 Custom Solution Builder</h3>
                <p>Build your custom business solution by selecting components</p>
            </div>
            <div class="builder-content">
                <div class="components-panel">
                    <h4>Available Components</h4>
                    <div class="components-grid">
                        ${this.solutionBuilder.components.map(component => `
                            <div class="component-card" data-component-id="${component.id}">
                                <h5>${component.name}</h5>
                                <div class="component-details">
                                    <span class="cost">${component.cost.toLocaleString()} SAR</span>
                                    <span class="impact ${component.impact.toLowerCase()}">${component.impact}</span>
                                </div>
                                <button class="add-component-btn" onclick="gamingFeatures.addComponent('${component.id}')">
                                    Add Component
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="solution-panel">
                    <h4>Your Custom Solution</h4>
                    <div id="selected-components" class="selected-components">
                        <p class="empty-message">No components selected yet</p>
                    </div>
                    <div class="solution-summary">
                        <div class="summary-item">
                            <span>Total Cost:</span>
                            <span id="total-cost">0 SAR</span>
                        </div>
                        <div class="summary-item">
                            <span>Total Impact:</span>
                            <span id="total-impact">Low</span>
                        </div>
                    </div>
                    <button class="generate-solution-btn" onclick="gamingFeatures.generateSolution()">
                        Generate Solution Report
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(builderContainer);
    }

    addComponent(componentId) {
        const component = this.solutionBuilder.components.find(c => c.id === componentId);
        if (!component) return;

        this.solutionBuilder.selectedComponents.push(component);
        this.solutionBuilder.totalCost += component.cost;
        this.updateSolutionBuilder();
    }

    updateSolutionBuilder() {
        const selectedContainer = document.getElementById('selected-components');
        const totalCostElement = document.getElementById('total-cost');
        const totalImpactElement = document.getElementById('total-impact');

        if (this.solutionBuilder.selectedComponents.length === 0) {
            selectedContainer.innerHTML = '<p class="empty-message">No components selected yet</p>';
        } else {
            selectedContainer.innerHTML = this.solutionBuilder.selectedComponents.map(component => `
                <div class="selected-component">
                    <span>${component.name}</span>
                    <span class="component-cost">${component.cost.toLocaleString()} SAR</span>
                    <button onclick="gamingFeatures.removeComponent('${component.id}')">Remove</button>
                </div>
            `).join('');
        }

        totalCostElement.textContent = this.solutionBuilder.totalCost.toLocaleString() + ' SAR';
        
        // Calculate total impact
        const impactScores = { 'Low': 1, 'Medium': 2, 'High': 3 };
        const totalImpactScore = this.solutionBuilder.selectedComponents.reduce((sum, component) => 
            sum + impactScores[component.impact], 0);
        
        let totalImpact = 'Low';
        if (totalImpactScore >= 6) totalImpact = 'High';
        else if (totalImpactScore >= 3) totalImpact = 'Medium';
        
        totalImpactElement.textContent = totalImpact;
    }

    removeComponent(componentId) {
        const component = this.solutionBuilder.selectedComponents.find(c => c.id === componentId);
        if (!component) return;

        this.solutionBuilder.selectedComponents = this.solutionBuilder.selectedComponents.filter(c => c.id !== componentId);
        this.solutionBuilder.totalCost -= component.cost;
        this.updateSolutionBuilder();
    }

    generateSolution() {
        if (this.solutionBuilder.selectedComponents.length === 0) {
            alert('Please select at least one component');
            return;
        }

        const solutionReport = document.createElement('div');
        solutionReport.className = 'solution-report-modal';
        solutionReport.innerHTML = `
            <div class="report-content">
                <h3>📋 Custom Solution Report</h3>
                <div class="report-summary">
                    <h4>Solution Overview</h4>
                    <p>Total Components: ${this.solutionBuilder.selectedComponents.length}</p>
                    <p>Total Investment: ${this.solutionBuilder.totalCost.toLocaleString()} SAR</p>
                    <p>Expected Timeline: ${Math.ceil(this.solutionBuilder.selectedComponents.length * 2)} months</p>
                </div>
                <div class="report-components">
                    <h4>Selected Components</h4>
                    ${this.solutionBuilder.selectedComponents.map(component => `
                        <div class="report-component">
                            <strong>${component.name}</strong>
                            <span>Cost: ${component.cost.toLocaleString()} SAR</span>
                            <span>Impact: ${component.impact}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="report-recommendations">
                    <h4>Implementation Recommendations</h4>
                    <ul>
                        <li>Start with high-impact components first</li>
                        <li>Implement in phases to minimize disruption</li>
                        <li>Monitor ROI and adjust strategy accordingly</li>
                        <li>Ensure proper change management</li>
                    </ul>
                </div>
                <button onclick="this.parentElement.parentElement.remove()">Close Report</button>
            </div>
        `;

        document.body.appendChild(solutionReport);
    }

    // 4. Challenge-based Forms Implementation
    initializeChallengeForms() {
        this.challengeForm = {
            currentChallenge: 0,
            challenges: [
                {
                    id: 'business-objective',
                    question: 'What is your primary business objective?',
                    type: 'multiple-choice',
                    options: ['Cost Reduction', 'Revenue Growth', 'Market Expansion', 'Digital Transformation'],
                    correct: 'Digital Transformation',
                    points: 10
                },
                {
                    id: 'implementation-timeline',
                    question: 'What is your preferred implementation timeline?',
                    type: 'slider',
                    min: 3,
                    max: 24,
                    correct: 12,
                    points: 5
                },
                {
                    id: 'budget-range',
                    question: 'What is your budget range for this initiative?',
                    type: 'range',
                    options: ['Under 500K SAR', '500K - 2M SAR', '2M - 5M SAR', '5M+ SAR'],
                    correct: '2M - 5M SAR',
                    points: 10
                }
            ],
            userAnswers: {},
            totalPoints: 0
        };

        this.createChallengeFormInterface();
    }

    createChallengeFormInterface() {
        const formContainer = document.createElement('div');
        formContainer.className = 'challenge-form-container';
        formContainer.innerHTML = `
            <div class="challenge-header">
                <h3>🎯 Challenge-based Consultation Form</h3>
                <p>Complete challenges to get personalized recommendations</p>
            </div>
            <div class="challenge-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="challenge-progress"></div>
                </div>
                <span id="challenge-counter">Challenge 1 of ${this.challengeForm.challenges.length}</span>
            </div>
            <div id="challenge-content" class="challenge-content">
                <!-- Challenge content will be dynamically loaded -->
            </div>
            <div class="challenge-navigation">
                <button id="prev-challenge" onclick="gamingFeatures.previousChallenge()" disabled>Previous</button>
                <button id="next-challenge" onclick="gamingFeatures.nextChallenge()">Next</button>
            </div>
        `;

        document.body.appendChild(formContainer);
        this.loadChallenge(0);
    }

    loadChallenge(challengeIndex) {
        const challenge = this.challengeForm.challenges[challengeIndex];
        const contentContainer = document.getElementById('challenge-content');
        const progressFill = document.getElementById('challenge-progress');
        const counter = document.getElementById('challenge-counter');

        // Update progress
        const progress = ((challengeIndex + 1) / this.challengeForm.challenges.length) * 100;
        progressFill.style.width = progress + '%';
        counter.textContent = `Challenge ${challengeIndex + 1} of ${this.challengeForm.challenges.length}`;

        // Load challenge content
        let challengeHTML = `
            <div class="challenge-question">
                <h4>${challenge.question}</h4>
        `;

        switch (challenge.type) {
            case 'multiple-choice':
                challengeHTML += `
                    <div class="multiple-choice-options">
                        ${challenge.options.map((option, index) => `
                            <label class="option-label">
                                <input type="radio" name="challenge-${challenge.id}" value="${option}">
                                <span class="option-text">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                `;
                break;
            case 'slider':
                challengeHTML += `
                    <div class="slider-container">
                        <input type="range" id="challenge-slider" min="${challenge.min}" max="${challenge.max}" value="${challenge.correct}">
                        <span id="slider-value">${challenge.correct} months</span>
                    </div>
                `;
                break;
            case 'range':
                challengeHTML += `
                    <div class="range-options">
                        ${challenge.options.map((option, index) => `
                            <label class="option-label">
                                <input type="radio" name="challenge-${challenge.id}" value="${option}">
                                <span class="option-text">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                `;
                break;
        }

        challengeHTML += '</div>';
        contentContainer.innerHTML = challengeHTML;

        // Setup event listeners
        this.setupChallengeEventListeners(challenge);
    }

    setupChallengeEventListeners(challenge) {
        if (challenge.type === 'slider') {
            const slider = document.getElementById('challenge-slider');
            const valueDisplay = document.getElementById('slider-value');
            
            slider.addEventListener('input', (e) => {
                valueDisplay.textContent = e.target.value + ' months';
            });
        }
    }

    nextChallenge() {
        const currentChallenge = this.challengeForm.challenges[this.challengeForm.currentChallenge];
        
        // Save user answer
        this.saveUserAnswer(currentChallenge);

        if (this.challengeForm.currentChallenge < this.challengeForm.challenges.length - 1) {
            this.challengeForm.currentChallenge++;
            this.loadChallenge(this.challengeForm.currentChallenge);
        } else {
            this.completeChallengeForm();
        }

        this.updateNavigationButtons();
    }

    previousChallenge() {
        if (this.challengeForm.currentChallenge > 0) {
            this.challengeForm.currentChallenge--;
            this.loadChallenge(this.challengeForm.currentChallenge);
        }
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-challenge');
        const nextBtn = document.getElementById('next-challenge');

        prevBtn.disabled = this.challengeForm.currentChallenge === 0;
        
        if (this.challengeForm.currentChallenge === this.challengeForm.challenges.length - 1) {
            nextBtn.textContent = 'Complete';
        } else {
            nextBtn.textContent = 'Next';
        }
    }

    saveUserAnswer(challenge) {
        let answer = '';

        switch (challenge.type) {
            case 'multiple-choice':
            case 'range':
                const selected = document.querySelector(`input[name="challenge-${challenge.id}"]:checked`);
                answer = selected ? selected.value : '';
                break;
            case 'slider':
                answer = document.getElementById('challenge-slider').value;
                break;
        }

        this.challengeForm.userAnswers[challenge.id] = answer;
    }

    completeChallengeForm() {
        // Calculate points
        this.challengeForm.totalPoints = 0;
        this.challengeForm.challenges.forEach(challenge => {
            const userAnswer = this.challengeForm.userAnswers[challenge.id];
            if (userAnswer === challenge.correct) {
                this.challengeForm.totalPoints += challenge.points;
            }
        });

        this.userScore += this.challengeForm.totalPoints;
        this.updateScore();

        // Show completion modal
        const completionModal = document.createElement('div');
        completionModal.className = 'completion-modal';
        completionModal.innerHTML = `
            <div class="completion-content">
                <h3>🎉 Challenge Complete!</h3>
                <div class="completion-results">
                    <p>Points Earned: ${this.challengeForm.totalPoints}</p>
                    <p>Total Score: ${this.userScore}</p>
                </div>
                <div class="personalized-recommendations">
                    <h4>Personalized Recommendations</h4>
                    ${this.generatePersonalizedRecommendations()}
                </div>
                <button onclick="this.parentElement.parentElement.remove()">Get Full Consultation</button>
            </div>
        `;

        document.body.appendChild(completionModal);
    }

    generatePersonalizedRecommendations() {
        const recommendations = [];
        const answers = this.challengeForm.userAnswers;

        if (answers['business-objective'] === 'Digital Transformation') {
            recommendations.push('Focus on AI implementation and cloud migration');
        }
        if (answers['implementation-timeline'] >= 12) {
            recommendations.push('Consider phased implementation approach');
        }
        if (answers['budget-range'] === '2M - 5M SAR') {
            recommendations.push('Optimal budget for comprehensive transformation');
        }

        return recommendations.map(rec => `<li>${rec}</li>`).join('');
    }

    // Utility methods
    updateScore() {
        const scoreElement = document.getElementById('user-score');
        if (scoreElement) {
            scoreElement.textContent = this.userScore;
        }
    }

    findPuzzle(puzzleId) {
        // This would be implemented to find puzzles from the puzzle database
        return null;
    }

    // Initialize all gaming features
    initialize() {
        this.initializeStrategyPuzzles();
        this.initializeValueGames();
        this.initializeSolutionBuilder();
        this.initializeChallengeForms();
        
        console.log('🎮 DoganConsult Gaming Features initialized successfully!');
    }
}

// Initialize gaming features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gamingFeatures = new DoganConsultGamingFeatures();
    window.gamingFeatures.initialize();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DoganConsultGamingFeatures;
}
