<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPassword;



class ContactController
{

    public function index(): Response
    {
        return Inertia::render('ClientSide/Contact/contact');
    }

    public function dashboard_index(): Response
    {
        return Inertia::render('Dashboard/Contacts/contacts' , [
            'contacts' => Contact::query()
                ->orderBy('created_at', 'desc')
                ->paginate(10)
        ]);
    }

    public function store()
    {
        $contactData = request()->validate([
            'first_name' => 'required:max:255',
            'last_name' => 'required:max:255',
            'email' => 'required|email',
            'phone' => 'required:max:255',
            'subject' => 'required:max:255',
            'message' => 'required',
        ]);
        $contact = Contact::create($contactData);

        // Send email
        // Mail::to(request('email'))
            // ->send(new ForgotPassword(request('name'), request('message')));
        
        
        $recipientEmail = 'youcef.hemadou@hotmail.com';
        $name = request('first_name') . " " . request('last_name'); 
        $view = 'contact-message';
        $data = ['contact' => $contactData];
        Mail::send($view, $data, function ($message) use ($recipientEmail, $name) {
            $message->to($recipientEmail, "Youcef Hemadou")
                    ->from(request('email'), $name)
                    ->subject(request('subject'));
        });

        return redirect('/')
            ->with('message', 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.');
    }


    public function show(Contact $contact): Response
    {
        return Inertia::render('Dashboard/Contacts/contact' , [
            'contact' => $contact
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->route('contacts');
    }


}
