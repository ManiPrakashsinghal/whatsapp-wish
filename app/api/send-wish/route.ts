import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  const { name, mobile } = await req.json();

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  try {

    let reqObj = {
      from: "whatsapp:+14155238886",  //process.env.TWILIO_WHATSAPP_FROM!, // sandbox number
      to: `whatsapp:+91${mobile}`, // your joined number
      body: `🎉 Happy Birthday ${name}!\n\nWarm wishes,\nMani Prakash Singhal`
    }
    console.log(reqObj)

    await client.messages.create(reqObj);

    return NextResponse.json({
      success: true,
      message: "WhatsApp wish sent via Twilio Sandbox 🎉"
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
