<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Inertia\Inertia;
use Inertia\Response;

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
        $contact = request()->validate([
            'first_name' => 'required:max:255',
            'last_name' => 'required:max:255',
            'email' => 'required|email',
            'phone' => 'required:max:255',
            'title' => 'required:max:255',
            'subject' => 'required',
        ]);
        Contact::create($contact);

        // Send email
        // Mail::to(request('email'))
        //     ->send(new ContactMail(request('name'), request('message')));

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
