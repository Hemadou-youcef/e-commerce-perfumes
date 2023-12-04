<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{




    public function index(): Response
    {

        $data = [];
        if (\auth()->user()->isAdmin()) {
            $data = $this->adminData();
        } elseif (\auth()->user()->isEmployee()) {
            $data = $this->employeeData();
        }

        return Inertia::render('Dashboard/dashboard', [
            'data' => $data,
        ]);





    }



    private function sales($startDate = null , $endDate = null): int
    {
        if(!$startDate) {   $startDate = now()->subDay(); }

        if(!$endDate) {    $endDate = now();   }

        return Order::query()
            ->where('status', ['confirmed' , 'delivered'])
            ->whereBetween('created_at', [
                $startDate,
                $endDate,
            ])
            ->get()->sum('total');

    }


    public function profit($startDate = null , $endDate = null): int
    {
        if(!$startDate) {   $startDate = now()->subMonth(); }

        if(!$endDate) {    $endDate = now();   }

        return Order::query()
            ->where('status', ['confirmed' , 'delivered'])
            ->whereBetween('created_at', [
                $startDate,
                $endDate,
            ])
            ->get()->sum('profit');

    }

    public function profitChartData($startDate = null , $endDate = null)
    {
        if(!$startDate) {   $startDate = now()->subMonth(); }
        if(!$endDate) {    $endDate = now();   }

        // output format
        // [
            // name: dd-mm
            // total: 0
        // ]
        $orders = Order::query()
            ->where('status', ['confirmed' , 'delivered'])
            ->whereBetween('created_at', [
                $startDate,
                $endDate,
            ])
            ->get()
            ->groupBy(function($order) {
                return $order->created_at->format('d-m');
            })
            ->map(fn($orders) => $orders->sum('profit'))
            ->map(fn($profit , $date) => [
                'name' => $date,
                'total' => $profit,
            ])
            ->values();
            
        return $orders;

    }
    // order counts function and make the default startDate now and endDate 1 month ago
    private function ordersCount($startDate = null, $endDate = null): array
    {
        if(!$startDate) {   $startDate = now()->subMonth(); }
        if(!$endDate) {    $endDate = now();   }

        $orders = Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

        return [
            'pending' => $orders->where('status', 'pending')->count(),
            'confirmed' => $orders->where('status', 'confirmed')->count(),
            'delivered' => $orders->where('status', 'delivered')->count(),
            'canceled' => $orders->where('status', 'canceled')->count(),
            'total' => $orders->count(),
        ];
    }


    private function orders($startDate = null, $endDate = null , $status = null , $limit = 5 )
    {
        if(!$startDate) {   $startDate = now()->subMonth(); }

        if(!$endDate) {    $endDate = now();   }

        $orders = Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->when($status == 'completed' , fn($query , $status) => $query->where('status' , ['confirmed' , 'delivered']))
            ->when($status , fn($query , $status) => $query->where('status' , $status))
            ->take($limit)
            ->get()
            ->map(fn(Order $order) => [
                'id' => $order->id,
                'user' => $order->user->name,
                'total' => $order->total,
                'status' => $order->status,
                'created_at' => $order->created_at->format('Y-m-d H:i'),
            ]);

        ;

        return $orders;
    }


    private function adminData(): array
    {
        $startDate = \request('startDate');
        $endDate = \request('endDate');

        $salesStartDate = \request('salesStartDate');
        $salesEndDate = \request('salesEndDate');

        $profitStartDate = \request('profitStartDate');
        $profitEndDate = \request('profitEndDate');

        $ordersCountStartDate = \request('ordersCountStartDate');
        $ordersCountEndDate = \request('ordersCountEndDate');

        $ordersStatus = \request('ordersStatus');
        $ordersLimit = \request('ordersLimit');
        $orderStartDate = \request('orderStartDate');
        $orderEndDate = \request('orderEndDate');

        if ($startDate && $endDate) {
            return [
                'sales' => $this->sales($startDate, $endDate),
                'profit' => $this->profit($startDate, $endDate),
                'ordersCount' => $this->ordersCount($startDate, $endDate),
                'orders' => $this->orders(null,null, $ordersStatus, $ordersLimit),
                'chartData' => $this->profitChartData(null,null),
            ];
        }
        $adminData = [
            'sales' => $this->sales($salesStartDate, $salesEndDate),
            'profit' => $this->profit($profitStartDate, $profitEndDate),
            'ordersCount' => $this->ordersCount($ordersCountStartDate, $ordersCountEndDate),
            'orders' => $this->orders($orderStartDate,$orderEndDate, $ordersStatus, $ordersLimit),
            'chartData' => $this->profitChartData(null,null),
        ];

        return $adminData;
    }


    private function employeeData(): array
    {
        $startDate = \request('startDate');
        $endDate = \request('endDate');

        $ordersCountStartDate = \request('ordersCountStartDate');
        $ordersCountEndDate = \request('ordersCountEndDate');

        $ordersStatus = 'confirmed';
        $ordersLimit = \request('ordersLimit');
        $orderStartDate = \request('orderStartDate');
        $orderEndDate = \request('orderEndDate');

        if ($startDate && $endDate) {
            return [
                'ordersCount' => $this->ordersCount($startDate, $endDate),
                'orders' => $this->orders($startDate,$endDate, $ordersStatus, $ordersLimit),
            ];
        }
        return [
            'ordersCount' => $this->ordersCount($ordersCountStartDate, $ordersCountEndDate),
            'orders' => $this->orders($orderStartDate,$orderEndDate, $ordersStatus, $ordersLimit),
        ];

    }







}
