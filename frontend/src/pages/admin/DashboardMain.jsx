import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import DashboardCards from '../../components/admin/DashboardCards';
import RecentComplaints from '../../components/admin/RecentComplaints';

const DashboardMain = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        occupancyRate: 0,
        openComplaints: 0
    });
    const [recentComplaints, setRecentComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [resStudents, resRooms, resComplaints] = await Promise.all([
                    API.get('/students').catch(() => ({ data: [] })),
                    API.get('/rooms').catch(() => ({ data: [] })),
                    API.get('/complaints').catch(() => ({ data: [] }))
                ]);

                const students = resStudents.data || [];
                const rooms = resRooms.data || [];
                const complaints = resComplaints.data || [];

                // Calculating Stats
                const totalStudents = students.length;
                
                let totalCapacity = 0;
                let occupiedBeds = 0;
                rooms.forEach(room => {
                    totalCapacity += room.capacity || 2; // Default to 2 if capacity not set
                    occupiedBeds += room.occupiedBeds || (room.occupants ? room.occupants.length : 0);
                });
                const occupancyRate = totalCapacity > 0 ? Math.round((occupiedBeds / totalCapacity) * 100) : 0;

                const openComplaintsCount = complaints.filter(
                    c => c.status && c.status.toLowerCase() !== 'resolved'
                ).length;

                setStats({
                    totalStudents,
                    occupancyRate,
                    openComplaints: openComplaintsCount
                });

                // Get latest 5 complaints
                const openComplaintsSorted = complaints
                    .filter(c => c.status && c.status.toLowerCase() !== 'resolved')
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                setRecentComplaints(openComplaintsSorted.slice(0, 5));
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-8">
                Dashboard Overview
            </h1>
            
            <DashboardCards stats={stats} />
            
            <div className="grid grid-cols-1 gap-8">
                <RecentComplaints complaints={recentComplaints} />
            </div>
        </div>
    );
};

export default DashboardMain;
