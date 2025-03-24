"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

interface TermsModalProps {
  open: boolean;
  handleClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle className="text-lg font-bold text-center">
        GamerGizmo LLC – Gaming PC Inspection Terms and Conditions
      </DialogTitle>
      {/* <DialogContentText>PCS In</DialogContentText> */}
      <DialogContent className="p-6 space-y-4 text-gray-700 dark:text-gray-300">
        <p>Effective as of March 25, 2025.</p>
        <p>
          These terms and conditions (“Terms”) govern your use of the Gaming PC
          Inspection Service (“Service”) provided by GamerGizmo LLC, a company
          registered under the Sharjah Media City (Shams) Free Zone, United Arab
          Emirates (“GamerGizmo LLC”, “we”, “our”, or “us”).
        </p>
        <p>
          By proceeding with the Service—whether by clicking “Accept,”
          “Confirm,” or through any other means—you agree to be bound by these
          legally enforceable Terms. If you do not accept them, you must not
          proceed with the Service.
        </p>

        <ol className="list-decimal list-inside space-y-3">
          <li>
            <strong className="text-gray-900 dark:text-white">
              Authorization for Inspection
            </strong>
            <p className="pl-4">
              <span className="font-bold ">1.1. </span>
              You authorize GamerGizmo LLC to receive, access, power on, and
              inspect the gaming PC (“PC”) submitted for evaluation. If the PC
              is owned by someone else, you confirm you have full authority to
              act on the owner's behalf.
            </p>
            <p className="pl-4">
              <span className="font-bold ">1.2. </span>
              GamerGizmo LLC reserves the right to reject any PC for inspection
              if it has visible physical damage, signs of tampering,
              unauthorized modifications, or poses any operational risk to our
              personnel or equipment.
            </p>
          </li>

          <li>
            <strong className="text-gray-900 dark:text-white">
              Scope and Limitations of Service
            </strong>
            <p className="pl-4">
              <span className="font-bold ">2.1. </span>
              The Service includes a non-invasive inspection of the PC’s core
              components: processor (CPU), graphics card (GPU), RAM, storage,
              power unit, and general physical condition. Basic thermal and
              performance benchmarks will also be reviewed. Results are compiled
              in an official Inspection Certificate (“Report”).
            </p>
            <p className="pl-4">
              <span className="font-bold ">2.2. </span>
              This Service does not include deep diagnostics, dismantling, BIOS
              analysis, liquid cooling system inspection, or software/data
              integrity checks.
            </p>
            <p className="pl-4">
              <span className="font-bold ">2.3. </span>
              GamerGizmo LLC does not verify product licenses, software
              authenticity, or manufacturer warranty coverage unless expressly
              included as part of a separate service.
            </p>
            <p className="pl-4">
              <span className="font-bold ">2.4. </span>
              Any faults or issues that are intermittent, hidden, or not
              externally visible may go undetected during the standard
              inspection process.
            </p>
          </li>

          <li>
            <strong className="text-gray-900 dark:text-white">
              Customer Responsibility and Risk
            </strong>
            <p className="pl-4">
              <span className="font-bold ">3.1. </span>
              You or your authorized representative must be available during the
              scheduled inspection time (if on-site). If the PC is dropped off,
              you are solely responsible for safe transport to and from our
              facility.
            </p>
            <p className="pl-4">
              <span className="font-bold ">3.2. </span>
              All risk related to hardware, software, data loss, or third-party
              claims remains with you. GamerGizmo LLC accepts no responsibility
              for such risks during or after inspection.
            </p>
          </li>

          <li>
            <strong className="text-gray-900 dark:text-white">
              Inspection Certificate
            </strong>
            <p className="pl-4">
              <span className="font-bold ">4.1. </span>
              After the inspection is complete, GamerGizmo LLC will issue a
              digital Inspection Certificate summarizing the PC’s operational
              health, visible condition, and test results.
            </p>
            <p className="pl-4">
              <span className="font-bold ">4.2. </span>
              The certificate reflects the condition of the PC only at the time
              of inspection. It does not guarantee future performance,
              longevity, or market resale value.
            </p>
            <p className="pl-4">
              <span className="font-bold ">4.3. </span>
              The certificate is the intellectual property of GamerGizmo LLC.
              Unauthorized reproduction, editing, or redistribution is strictly
              prohibited.
            </p>
          </li>

          <li>
            <strong className="text-gray-900 dark:text-white">
              Disclaimer and Limitation of Liability
            </strong>
            <p className="pl-4">
              <span className="font-bold ">5.1. </span>
              The Inspection Certificate is provided for informational purposes.
              GamerGizmo LLC is not liable for any decisions (buying, selling,
              pricing) based on the contents of the certificate.
            </p>
            <p className="pl-4">
              <span className="font-bold ">5.2. </span>
              To the fullest extent permitted by law, we disclaim all
              warranties—express or implied—related to accuracy, completeness,
              merchantability, or fitness for a particular purpose.
            </p>
            <p className="pl-4">
              <span className="font-bold ">5.3. </span>
              GamerGizmo LLC shall not be held liable for any indirect,
              incidental, or consequential damages arising out of or in
              connection with this Service.
            </p>
            <p className="pl-4">
              <span className="font-bold ">5.4. </span>
              Our total liability under these Terms shall in no case exceed AED
              250.
            </p>
          </li>

          <li>
            <strong className="text-gray-900 dark:text-white">
              Governing Law and Jurisdiction
            </strong>
            <p className="pl-4">
              <span className="font-bold ">6.1. </span>
              These Terms shall be governed by and interpreted in accordance
              with the laws of the United Arab Emirates and the Sharjah Media
              City (Shams) Free Zone regulations.
            </p>
            <p className="pl-4">
              <span className="font-bold ">6.2. </span>
              Any disputes shall be exclusively settled by the competent courts
              in the Emirate of Sharjah, UAE.
            </p>
          </li>

          <li>
            <strong className="text-gray-900 dark:text-white">
              Acknowledgment and Updates
            </strong>
            <p className="pl-4">
              <span className="font-bold ">7.1. </span>
              By using the Service, you acknowledge that you have read,
              understood, and agreed to these Terms.
            </p>
            <p className="pl-4">
              <span className="font-bold ">7.2. </span>
              GamerGizmo LLC reserves the right to amend these Terms at any
              time. Updates will be effective immediately upon publication.
              Continued use of the Service constitutes acceptance of the revised
              Terms.
            </p>
          </li>
        </ol>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsModal;
