import { formatPhoneNumberIntl } from "react-phone-number-input";

type FormatPhoneNumberProps = {
  phoneNumber: string;
};

const addSeparation = (phoneNumber: string) =>
  phoneNumber.replace(/(\+\d{2})\s(\d{2})\s(\d{5})\s(\d{4})/, "$1 ($2) $3-$4");

export function FormatPhoneNumber({ phoneNumber }: FormatPhoneNumberProps) {
  const phoneNumberWithPlus = phoneNumber?.startsWith("+")
    ? phoneNumber
    : "+" + phoneNumber;

  if (
    phoneNumberWithPlus.startsWith("+55") &&
    phoneNumberWithPlus.length === 13
  ) {
    const formatPhoneNumber = addSeparation(
      formatPhoneNumberIntl(phoneNumberWithPlus)
    );

    if (formatPhoneNumber.match(/\+55 \d{2}\d{8}/g)) {
      const tryWithNine = phoneNumberWithPlus.replace(
        /(\+55\d{2})(\d+)/g,
        "$19$2"
      );
      return addSeparation(formatPhoneNumberIntl(tryWithNine));
    }
  }
  return (
    <span>{addSeparation(formatPhoneNumberIntl(phoneNumberWithPlus))}</span>
  );
}
