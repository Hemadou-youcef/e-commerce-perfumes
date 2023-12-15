<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use function auth;
use function request;

class DashboardController extends Controller
{


    public function index(): Response
    {

        $data = [];
        if (auth()->user()->isAdmin()) {
            $data = $this->adminData();
        } elseif (auth()->user()->isEmployee()) {
            $data = $this->employeeData();
        }

        return Inertia::render('Dashboard/dashboard', [
            'data' => $data,
        ]);
    }


    public function sales($startDate = null, $endDate = null): int
    {
        if (!$startDate) {
            $startDate = now()->subDay();
        }

        if (!$endDate) {
            $endDate = now();
        }

        return Order::query()
            ->whereIn('status', ['confirmed', 'delivered'])
            ->whereBetween('created_at', [
                $startDate,
                $endDate,
            ])
            ->get()->sum('total');
    }


    // order counts function and make the default startDate now and endDate 1 month ago

    public function profit($startDate = null, $endDate = null): int
    {
        if (!$startDate) {
            $startDate = now()->subMonth();
        }

        if (!$endDate) {
            $endDate = now();
        }

        return Order::query()
            ->whereIn('status', ['confirmed', 'delivered'])
            ->whereBetween('created_at', [
                $startDate,
                $endDate,
            ])
            ->get()->sum('profit');
    }

    public function ordersCount($startDate = null, $endDate = null): array
    {
        if (!$startDate) {
            $startDate = now()->subMonth();
        }
        if (!$endDate) {
            $endDate = now();
        }

        $orders = Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

        return [
            'pending' => $orders->where('status', 'pending')->count(),
            'confirmed' => $orders->where('status', 'confirmed')->count(),
            'delivered' => $orders->where('status', 'delivered')->count(),
            'cancelled' => $orders->where('status', 'cancelled')->count(),
            'total' => $orders->count(),
        ];
    }

    public function orders($startDate = null, $endDate = null, $status = null, $limit = 5)
    {
        if (!$startDate) {
            $startDate = now()->subMonth();
        }

        if (!$endDate) {
            $endDate = now();
        }

        if (!$status) {
            $status = 'delivered';
        }

        return Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('status', $status)
            ->take($limit)
            ->get()
            ->map(fn (Order $order) => [
                'id' => $order->id,
                'user' => $order->user,
                'profit' => $order->profit,
                'total' => $order->total,
                'status' => $order->status,
                'created_at' => $order->created_at->format('Y-m-d H:i'),
            ]);
    }

    public function adminData(): array
    {
        $startDate = \request('startDate');
        $endDate = \request('endDate');

        $salesStartDate = request('salesStartDate');
        $salesEndDate = request('salesEndDate');

        $profitStartDate = request('profitStartDate');
        $profitEndDate = request('profitEndDate');

        $ordersCountStartDate = request('ordersCountStartDate');
        $ordersCountEndDate = request('ordersCountEndDate');

        $ordersStatus = request('ordersStatus');
        $ordersLimit = request('ordersLimit');
        $orderStartDate = request('orderStartDate');
        $orderEndDate = request('orderEndDate');


        $chartStartDate = request('chartStartDate');
        $chartEndDate = request('chartEndDate');
        $chartPeriod = request('chartPeriod'); // yearly, monthly, daily

        if ($startDate && $endDate) {
            return [
                'sales' => $this->sales($startDate, $endDate),
                'profit' => $this->profit($startDate, $endDate),
                'ordersCount' => $this->ordersCount($startDate, $endDate),
                'orders' => $this->orders(null, null, $ordersStatus, $ordersLimit),
                'clientsCount' => User::query()
                    ->whereHas('orders', fn ($query) => $query->whereIn('status', ['confirmed', 'delivered']))
                    ->count(),
                'profitChart' => $this->profitChart($chartStartDate, $chartEndDate, $chartPeriod),
            ];
        }
        return [
            'sales' => $this->sales($salesStartDate, $salesEndDate),
            'profit' => $this->profit($profitStartDate, $profitEndDate),
            'ordersCount' => $this->ordersCount($ordersCountStartDate, $ordersCountEndDate),
            'orders' => $this->orders($orderStartDate, $orderEndDate, $ordersStatus, $ordersLimit),
            'clientsCount' => User::query()
                ->whereHas('orders', fn ($query) => $query->whereIn('status', ['confirmed', 'delivered']))
                ->count(),
            'profitChart' => $this->profitChart($chartStartDate, $chartEndDate, $chartPeriod),

        ];
    }

    public function employeeData(): array
    {
        $startDate = \request('startDate');
        $endDate = \request('endDate');

        $ordersCountStartDate = request('ordersCountStartDate');
        $ordersCountEndDate = request('ordersCountEndDate');

        $ordersStatus = 'confirmed';
        $ordersLimit = request('ordersLimit');
        $orderStartDate = request('orderStartDate');
        $orderEndDate = request('orderEndDate');

        $chartStartDate = request('chartStartDate');
        $chartEndDate = request('chartEndDate');
        $chartPeriod = request('chartPeriod'); // yearly, monthly, daily
        if ($startDate && $endDate) {
            return [
                'ordersCount' => $this->ordersCount($startDate, $endDate),
                'orders' => $this->orders($startDate,$endDate, $ordersStatus, $ordersLimit),
                'ordersCountChart' => $this->ordersCountChart($chartStartDate, $chartEndDate, $chartPeriod),
            ];
        }
        return [
            'ordersCount' => $this->ordersCount($ordersCountStartDate, $ordersCountEndDate),
            'orders' => $this->orders($orderStartDate, $orderEndDate, $ordersStatus, $ordersLimit),
            'ordersCountChart' => $this->ordersCountChart($chartStartDate, $chartEndDate, $chartPeriod),
        ];
    }


    public function profitChart(
        $startDate = null,
        $endDate = null,
        $period = 'monthly'
    ): array {


        if (!$startDate) {
            $startDate = now()->subYear();
        }

        if (!$endDate) {
            $endDate = now()->endOfMonth();
        }

        switch ($period) {
            case "yearly":
                $format = 'Y';
                $interval = '1 year'; // Modify intervals to ensure they are strings
                if (!$startDate) {
                    $startDate = now()->subYears(5);
                }
                break;

            case "monthly":
                $format = 'F Y';
                $interval = '1 month';
                if (!$startDate) {
                    $startDate = now()->subMonths(12);  ;
                }
                break;

            case "daily":
                $format = 'm/d/Y';
                $interval = '1 day';
                if (!$startDate) {
                    $startDate = now()->subMonth();
                }
                break;

            default:
                $format = 'F Y';
                $interval = '1 month';
                if (!$startDate) {
                    $startDate = now()->subYear();
                }
        }

        $orders = Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

        $profit = [];
        $itemOrder = 0;

        for ($date = clone $startDate; $date->lte($endDate); $date->add($interval)) {
            $periodLabel = $date->format($format);

            $periodProfit = $orders->filter(function ($order) use ($periodLabel, $format) {
                return $order->created_at->format($format) == $periodLabel;
            })->sum(function ($order) {
                return $order->profit;
            });

            $profit[] = [
                'period' => $periodLabel,
                'profit' => $periodProfit,
                'order' => $itemOrder++,
            ];
        }

        return $profit;
    }

    public function ordersCountChart($startDate = null, $endDate = null, $period = 'monthly'): array
    {
        if (!$startDate) {
            $startDate = now()->subYear();
        }

        if (!$endDate) {
            $endDate = now()->endOfMonth();
        }

        switch ($period) {
            case "yearly":
                $format = 'Y';
                $interval = '1 year'; // Modify intervals to ensure they are strings
                if (!$startDate) {
                    $startDate = now()->subYears(5);
                }
                break;

            case "monthly":
                $format = 'F Y';
                $interval = '1 month';
                if (!$startDate) {
                    $startDate = now()->subYear();
                }
                break;

            case "daily":
                $format = 'm/d/Y';
                $interval = '1 day';
                if (!$startDate) {
                    $startDate = now()->subMonth();
                }
                break;

            default:
                $format = 'F Y';
                $interval = '1 month';
                if (!$startDate) {
                    $startDate = now()->subYear();
                }
        }

        $orders = Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('status', 'delivered')
            ->get();

        $ordersCount = [];
        $itemOrder = 0;

        for ($date = clone $startDate; $date->lte($endDate); $date->add($interval)) {
            $periodLabel = $date->format($format);

            $periodOrdersCount = $orders->filter(function ($order) use ($periodLabel, $format) {
                return $order->created_at->format($format) == $periodLabel;
            })->count();

            $ordersCount[] =  [
                'period' => $periodLabel,
                'ordersCount' => $periodOrdersCount,
                'order' => $itemOrder++,
            ];
        }

        return $ordersCount;
    }
}
