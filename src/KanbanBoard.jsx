// src/KanbanBoard.js

import React, { useEffect, useState } from 'react';
import { fetchTickets } from './api';
// import Card from './Card';
import './KanbanBoard.css';
function KanbanBoard() {
    const [tickets, setTickets] = useState([]);
    const [selectedGroupingOption, setSelectedGroupingOption] = useState('status');
    const [selectedSortingOption, setSelectedSortingOption] = useState('priority');
    const [users, setUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        // Fetch data from API and update 'tickets' and 'users' states
        fetchTickets()
            .then((data) => {
                setTickets(data.tickets);
                setUsers(data.users);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []); //

    // Function to group tickets by status
    const groupByStatus = () => {
        const groupedTickets = {};
        tickets.forEach((ticket) => {
            if (!groupedTickets[ticket.status]) {
                groupedTickets[ticket.status] = [];
            }
            groupedTickets[ticket.status].push(ticket);
        });
        return groupedTickets;
    };

    // Function to group tickets by user
    const groupByUser = () => {
        const groupedTickets = {};
        tickets.forEach((ticket) => {
            const user = users.find((u) => u.id === ticket.userId);
            const userName = user ? user.name : 'Unassigned';
            if (!groupedTickets[userName]) {
                groupedTickets[userName] = [];
            }
            groupedTickets[userName].push(ticket);
        });
        return groupedTickets;
    };

    // Function to group tickets by priority
    const groupByPriority = () => {
        const groupedTickets = {};
        tickets.forEach((ticket) => {
            if (!groupedTickets[ticket.priority]) {
                groupedTickets[ticket.priority] = [];
            }
            groupedTickets[ticket.priority].push(ticket);
        });
        return groupedTickets;
    };

    // Function to sort tickets by priority
    const sortByPriority = (groupedTickets) => {
        for (const priority in groupedTickets) {
            groupedTickets[priority].sort((a, b) => b.priority - a.priority);
        }
        return groupedTickets;
    };

    // Function to sort tickets by title
    const sortByTitle = (groupedTickets) => {
        for (const priority in groupedTickets) {
            groupedTickets[priority].sort((a, b) => a.title.localeCompare(b.title));
        }
        return groupedTickets;
    };
    // Render Kanban board columns
    const renderKanbanBoard = () => {
        // Get the grouped and sorted data based on user's selections
        const groupedData = selectedGroupingOption === 'status'
            ? groupByStatus()
            : selectedGroupingOption === 'user'
                ? groupByUser()
                : groupByPriority();

        const sortedData = selectedSortingOption === 'priority'
            ? sortByPriority(groupedData)
            : sortByTitle(groupedData);

        // Create an array of column components
        const kanbanColumns = Object.keys(sortedData).map((groupKey) => (
            <div key={groupKey} className="kanban-column-container">
                <div className="kanban-column">
                    <h2>{groupKey}</h2>
                    <div className="card-list">
                        {sortedData[groupKey].map((ticket) => (
                            <div key={ticket.id} className="kanban-card">
                                <h3>{ticket.title}</h3>
                                <p>Status: {ticket.status}</p>
                                <p>Priority: {ticket.priority}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ));

        return kanbanColumns;
    };



    // Toggle the dropdown menu visibility
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Handle grouping option selection
    const handleGroupingOptionSelect = (option) => {
        setSelectedGroupingOption(option);
        setShowDropdown(false); // Close the dropdown after selecting an option
    };

    // Handle sorting option selection
    const handleSortingOptionSelect = (option) => {
        setSelectedSortingOption(option);
        setShowDropdown(false); // Close the dropdown after selecting an option
    };

    // Render grouping and sorting dropdown menu
    const renderDropdownMenu = () => {
        return (
            <div className="dropdown-menu">
                <button onClick={toggleDropdown}>Options</button>
                {showDropdown && (
                    <div className="dropdown-content">
                        <button onClick={() => handleGroupingOptionSelect('status')}>Group by Status</button>
                        <button onClick={() => handleGroupingOptionSelect('user')}>Group by User</button>
                        <button onClick={() => handleGroupingOptionSelect('priority')}>Group by Priority</button>
                        <button onClick={() => handleSortingOptionSelect('priority')}>Sort by Priority</button>
                        <button onClick={() => handleSortingOptionSelect('title')}>Sort by Title</button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="kanban-board">
            <header className="kanban-header">
                <h1>Kanban Board</h1>
                {renderDropdownMenu()}
            </header>
            <div className="kanban-columns-container">
                {renderKanbanBoard()}
            </div>
        </div>
    );


}

export default KanbanBoard;
